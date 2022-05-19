import hashlib

from rest_framework import viewsets
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
from django.utils import timezone
from django.forms.models import model_to_dict

from utility.utility import *
from .serializers import *
from .models import *
from authorization.models import TokenMaster
from django.core.files.storage import default_storage

# Create your views here.


def create_new_token(str_length=50):
    while True:
        new_token = random_string_digits(str_length)
        if TokenMaster.objects.filter(token=new_token).exists():
            continue
        return new_token


def register_user_token():
    new_token = create_new_token(50)
    created_date = datetime.now(tz=timezone.utc)
    expired_date = created_date + timedelta(minutes=EXPIRE_MINUTES)
    user_token = TokenMaster(token=new_token, created_date=created_date, expired_date=expired_date)
    user_token.save()
    return new_token


class RoleViewSet(viewsets.ModelViewSet):
    queryset = RoleMaster.objects.all().order_by('id')
    serializer_class = RoleSerializer

    def list(self, request, *args, **kwargs):
        if len(request.query_params) == 0:
            return super().list(request, args, kwargs)

        params = request.query_params
        objects = RoleMaster.objects.all().order_by('id')
        if "role_name" in params:
            objects = objects.filter(role_name__iexact=params["role_name"])
        if "role_type" in params:
            objects = objects.filter(role_type__iexact=params["role_type"])
        if "company_id" in params:
            objects = objects.filter(company_id=params['company_id'])
        if "created_by" in params:
            objects = objects.filter(created_by=params['created_by'])
        if "updated_by" in params:
            objects = objects.filter(updated_by=params['updated_by'])
        self.queryset = objects
        return super().list(request, args, kwargs)

    @token_required
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @token_required
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, args, **kwargs)


class UserRoleViewSet(viewsets.ModelViewSet):
    queryset = UserRoleMap.objects.all().order_by('id')
    serializer_class = UserRoleSerializer

    @token_required
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, args, **kwargs)

    @token_required
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        if len(request.query_params) == 0:
            return super().list(request, args, kwargs)
        params = request.query_params
        objects = UserRoleMap.objects.all().order_by('id')
        if 'user_id' in params:
            objects = objects.filter(user_id=params['user_id'])
        if 'role_id' in params:
            objects = objects.filter(role_id=params['role_id'])
        if 'is_active' in params:
            objects = objects.filter(is_active=params['is_active'])
        if "created_by" in params:
            objects = objects.filter(created_by=params['created_by'])
        if "updated_by" in params:
            objects = objects.filter(updated_by=params['updated_by'])
        self.queryset = objects
        return super().list(request, args, kwargs)


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserMaster.objects.all().order_by('id')
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        params = request.query_params
        objects = UserMaster.objects.all()
        if 'captchaToken' in params:
            if not g_captcha_verify(params['captchaToken']):
                return HttpResponse('Error verifying reCAPTCHA, please try again.', status=501)
        if 'role' in params:
            loan_roles = RoleMaster.objects.filter(role_type__iexact=params['role'])
            if len(loan_roles) <= 0:
                return HttpResponse('loan officer roles not existed', status=510)
            rq = Q()
            for r in loan_roles:
                rq |= Q(role_id=r.id)
            role_maps = UserRoleMap.objects.filter(rq)

            if len(role_maps) > 0:
                mq = Q()
                for m in role_maps:
                    mq |= Q(id=m.user_id.id)
                objects = objects.filter(mq)
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
        if 'filter' in params:
            if params['filter'] != '':
                objects = objects.filter(Q(user_name__icontains=params['filter']) |
                                         Q(user_id__icontains=params['filter']) |
                                         Q(location__icontains=params['filter']) |
                                         Q(overview__icontains=params['filter']))
        if 'nmls_id' in params:
            objects = objects.filter(nmls_id=params['nmls_id'])
        self.queryset = objects
        result = super().list(request, args, kwargs)
        res = result.data
        if 'email' in params or 'user_id' in params:
            if 'password' in params:
                if len(res) > 0:
                    token = register_user_token()
                    res[0]['token'] = token
                    return Response(res, status=200)
        return result

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response('invalid request', status=400)

        if 'email' in request.data:
            email = validations(str(request.data['email']))
            if UserMaster.objects.filter(email__iexact=email).exists():
                return HttpResponse('existed email', status=501)
        if 'user_id' in request.data:
            user_id = validations(str(request.data['user_id']))
            if UserMaster.objects.filter(user_id=user_id).exists():
                return HttpResponse('existed user_id', status=502)
        if 'password' not in request.data:
            return HttpResponse('not defined password', status=503)
        if 'captchaToken' in request.data:
            if not g_captcha_verify(request.data['captchaToken']):
                return HttpResponse('Error verifying reCAPTCHA, please try again.', status=501)
        password = request.data['password']
        password = hashlib.md5(password.encode())
        request.data._mutable = True
        request.data['password'] = password.hexdigest()
        request.data._mutable = False
        if 'avatar' in request.data:
            avatar = request.data.get('avatar')
            if avatar:
                avatar_name = random_string_digits(20) + '.png'
                default_storage.save(f'avatar/{avatar_name}', avatar)
                request.data._mutable = True
                request.data['avatar'] = f'avatar/{avatar_name}'
                request.data._mutable = False

        token = register_user_token()
        res = super().create(request, args, kwargs)
        data = res.data
        data['token'] = token
        return Response(data, status=200)

    @token_required
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        if 'avatar' in request.data:
            avatar = request.data.get('avatar')
            if avatar:
                avatar_name = random_string_digits(20) + '.png'
                default_storage.save(f'avatar/{avatar_name}', avatar)
                request.data._mutable = True
                request.data['avatar'] = f'avatar/{avatar_name}'
                request.data._mutable = False
        if 'new_password' in request.data and 'old_password' in request.data:
            old_password = request.data['old_password']
            old_password = hashlib.md5(old_password.encode())
            if not UserMaster.objects.filter(Q(password=old_password.hexdigest()) & Q(id=kwargs['pk'])).exists():
                return HttpResponse('invalid credential', status=501)
            password = request.data['new_password']
            password = hashlib.md5(password.encode())
            request.data._mutable = True
            request.data['password'] = password.hexdigest()
            request.data._mutable = False
        return super().update(request, args, **kwargs)


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = CompanyMaster.objects.all().order_by('id')
    serializer_class = CompanySerializer

    def list(self, request, *args, **kwargs):
        params = request.query_params
        objects = CompanyMaster.objects.all()
        if len(params) == 0:
            return super().list(request, args, kwargs)
        if 'company_name' in params:
            objects = objects.filter(company_name__iexact=params['company_name'])
        if "company_code" in params:
            objects = objects.filter(company_code=params['company_code'])
        if 'filter' in params:
            if params['filter'] != '':
                objects = objects.filter(Q(company_name__icontains=params['filter']) |
                                         Q(company_code__icontains=params['filter']) |
                                         Q(company_address_line1__icontains=params['filter']) |
                                         Q(company_address_line2__icontains=params['filter']) |
                                         Q(country__icontains=params['filter']) |
                                         Q(city__icontains=params['filter']) |
                                         Q(zip_code__icontains=params['filter']))
        self.queryset = objects
        return super().list(request, args, kwargs)

    @token_required
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        if 'company_logo' in request.data:
            company_logo = request.data.get('company_logo')
            if company_logo:
                logo_name = random_string_digits(20) + '.png'
                default_storage.save(f'company_logo/{logo_name}', company_logo)
                request.data._mutable = True
                request.data['company_logo'] = f'company_logo/{logo_name}'
                request.data._mutable = False
        return super().update(request, args, **kwargs)

    @token_required
    def create(self, request, *args, **kwargs):
        if 'company_name' in request.data:
            company_name = validations(str(request.data['company_name']))
            if CompanyMaster.objects.filter(company_name__iexact=company_name).exists():
                return HttpResponse('existed company', status=501)
        else:
            return HttpResponse('not defined company name', status=502)

        if 'company_code' in request.data:
            company_code = validations(str(request.data['company_code']))
            if CompanyMaster.objects.filter(company_code=company_code).exists():
                return HttpResponse('existed company', status=503)
        else:
            return HttpResponse('not defined company code', status=504)

        if 'company_logo' in request.data:
            company_logo = request.data.get('company_logo')
            if company_logo:
                logo_name = random_string_digits(20) + '.png'
                default_storage.save(f'company_logo/{logo_name}', company_logo)
                request.data._mutable = True
                request.data['company_logo'] = f'company_logo/{logo_name}'
                request.data._mutable = False
        return super().create(request, args, kwargs)


class BrokerageViewSet(viewsets.ModelViewSet):
    queryset = BrokerageCompanyMaster.objects.all().order_by('id')
    serializer_class = BrokerageSerializer

    def list(self, request, *args, **kwargs):
        if len(request.query_params) == 0:
            return super().list(request, args, kwargs)
        params = request.query_params
        objects = BrokerageCompanyMaster.objects.all()
        if 'brokerage_company' in params:
            objects = objects.filter(brokerage_company=params['brokerage_company'])
        if 'company_id' in params:
            objects = objects.filter(company_id=params['company_id'])
        if 'is_active' in params:
            objects = objects.filter(is_active=params['is_active'])
        if 'created_by' in params:
            objects = objects.filter(created_by=params['created_by'])
        if 'updated_by' in params:
            objects = objects.filter(updated_by=params['updated_by'])
        self.queryset = objects
        return super().list(request, args, kwargs)

    @token_required
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, args, **kwargs)

    @token_required
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class WorkflowTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkflowTypeMaster.objects.all()
    serializer_class = WorkflowTypeSerializer