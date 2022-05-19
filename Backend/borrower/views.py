from rest_framework import viewsets
from django.db.models import Q
from django.http import HttpResponse
import hashlib

from utility.utility import *
from .serializers import *
from .models import *

# Create your views here.


class BorrowerViewSet(viewsets.ModelViewSet):
    queryset = BorrowerMaster.objects.all()
    serializer_class = BorrowerSerializer

    def list(self, request, *args, **kwargs):
        params = request.query_params
        objects = BorrowerMaster.objects.all()
        if 'is_active' in params:
            objects = objects.filter(is_active=params['is_active'])
        if 'user_name' in params:
            objects = objects.filter(user_name=params['user_name'])
        if 'user_id' in params:
            objects = objects.filter(Q(email__iexact=params['user_id']) | Q(user_id=params['user_id']))
        if 'email' in params:
            objects = objects.filter(Q(email__iexact=params['email']) | Q(user_id=params['email']))
        if 'password' in params:
            password = params['password']
            password = hashlib.md5(password.encode())
            objects = objects.filter(password=password.hexdigest())
        if 'phone' in params:
            objects = objects.filter(phone=params['phone'])
        if 'id' in params:
            objects = objects.filter(id=params['id'])
        self.queryset = objects
        return super().list(request, args, kwargs)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, args, **kwargs)

    def create(self, request, *args, **kwargs):
        if 'email' in request.data:
            email = validations(str(request.data['email']))
            if BorrowerMaster.objects.filter(email__iexact=email).exists():
                return HttpResponse('existed email', status=501)
        if 'user_id' in request.data:
            user_id = validations(str(request.data['user_id']))
            if BorrowerMaster.objects.filter(user_id=user_id).exists():
                return HttpResponse('existed user_id', status=502)
        if 'password' not in request.data:
            return HttpResponse('not defined password', status=503)
        password = request.data['password']
        password = hashlib.md5(password.encode())
        request.data._mutable = True
        request.data['password'] = password.hexdigest()
        request.data._mutable = False
        return super().create(request, args, kwargs)