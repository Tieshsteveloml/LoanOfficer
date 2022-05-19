from rest_framework import viewsets
from django.http import HttpResponse

from loanofficer.models import UserRoleMap
from borrower.models import BorrowerMaster
from .serializers import *
from .models import *

# Create your views here.


class NPSViewSet(viewsets.ModelViewSet):
    queryset = NPS.objects.all().order_by('id')
    serializer_class = NPSSerializer

    def create(self, request, *args, **kwargs):
        if 'user_id' not in request.data:
            return HttpResponse('not defined user_id', status=501)
        if 'sender_id' not in request.data:
            return HttpResponse('not defined sender_id', status=502)
        if not UserRoleMap.objects.filter(user_id=request.data['user_id']).exists():
            return HttpResponse('not existed user', status=503)
        rmap = UserRoleMap.objects.get(user_id=request.data['user_id'])
        if rmap.role_id.role_type.lower() == 'loan officer':
            if not BorrowerMaster.objects.filter(id=request.data['sender_id']).exists():
                return HttpResponse('not existed sender', status=502)
            nps_type = 1
        elif rmap.role_id.role_type.lower() == 'admin type':
            nps_type = 2
        else:
            return HttpResponse('wrong role user', status=504)
        request.data._mutable = True
        request.data['nps_type'] = nps_type
        request.data._mutable = False
        return super().create(request, args, kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        if 'user_id' in request.query_params:
            queryset = queryset.filter(user_id=request.query_params['user_id'])
        if 'sender_id' in request.query_params:
            queryset = queryset.filter(sender_id=request.query_params['sender_id'])
        if 'published' in request.query_params:
            queryset = queryset.filter(published=request.query_params['published'])
        if 'nps_type' in request.query_params:
            queryset = queryset.filter(nps_type=request.query_params['nps_type'])
        self.queryset = queryset
        return super().list(request, args, kwargs)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, args, **kwargs)


class TellUsViewSet(viewsets.ModelViewSet):
    queryset = TellUs.objects.all().order_by('id')
    serializer_class = TellUsSerializer

    def list(self, request, *args, **kwargs):
        try:
            if 'score' in request.query_params:
                score = int(request.query_params['score'])
                if score <= 6:
                    self.queryset = TellUs.objects.filter(name='detractor')
                elif score <= 8:
                    self.queryset = TellUs.objects.filter(name='passive')
                else:
                    self.queryset = TellUs.objects.filter(name='promoter')
            return super().list(request, args, kwargs)
        except Exception as e:
            print(str(e))
            return HttpResponse(str(e), status=405)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, args, **kwargs)


