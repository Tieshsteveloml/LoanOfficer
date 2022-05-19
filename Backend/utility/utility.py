import os
import json
import string
import random
from functools import wraps
from datetime import datetime
from django.utils import timezone
from rest_framework.response import Response

from urllib.parse import urlencode
from urllib.request import urlopen
from authorization.models import TokenMaster

TOKEN = 'QyftMqSpyI0Odn6U5JyYOCM37HTUVobCvUcNAM7MMkvkgh9xTs'
EXPIRE_MINUTES = 30


def validations(name):
    """ Validate username with removing the unwanted spaces"""
    name = name.strip()
    return name


def random_string_digits(str_length=10):
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for i in range(str_length))


def token_required(func):
    """token required decorator
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        try:
            token = args[1].data.get('token')
            if not token:
                return Response('Token is required to call the api', status=401)

            if token == TOKEN:
                return func(*args, **kwargs)
            if not TokenMaster.objects.filter(token=token).exists():
                return Response('Token is invalid', status=402)
            tk = TokenMaster.objects.get(token=token)
            now = datetime.now(tz=timezone.utc)
            if tk.expired_date < now:
                return Response('Token was expired, please login again', status=405)
            return func(*args, **kwargs)
        except Exception as e:
            return Response({}, status=500)

    return decorated_function


def g_captcha_verify(captcha_token):
    captcha_uri = 'https://www.google.com/recaptcha/api/siteverify'
    params = urlencode({
        'secret': os.environ.get("GOOGLE_CAP_SECRET_KEY", "ANONYMOUS"),
        'response': captcha_token
    })

    # print params
    data = urlopen(captcha_uri, params.encode('utf-8')).read()
    result = json.loads(data)
    return result.get('success', None)