from rest_framework import viewsets
from django.http import HttpResponse

from .serializers import *
from .models import *
from utility.utility import *

# Create your views here.


class ReferralMapViewSet(viewsets.ModelViewSet):
    queryset = ReferralMap.objects.all().order_by('id')
    serializer_class = ReferralMapSerializer

    def create(self, request, *args, **kwargs):
        if 'user_id' not in request.data:
            return HttpResponse('not defined user_id', status=501)

        if ReferralMap.objects.filter(user_id=request.data['user_id']).exists():
            return HttpResponse('already existed', status=201)
        if 'ref_id' in request.data and request.data['ref_id'] != '':
            if ReferralMap.objects.filter(referral_id=request.data['ref_id']).exists():
                user = ReferralMap.objects.get(referral_id=request.data['ref_id'])
                request.data._mutable = True
                request.data['referred_by'] = user.user_id.id
                request.data._mutable = False
        request.data._mutable = True
        request.data['referral_id'] = random_string_digits(10)
        request.data._mutable = False
        return super().create(request, args, kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        if 'user_id' in request.query_params:
            queryset = queryset.filter(user_id=request.query_params['user_id'])
        if 'referral_id' in request.query_params and request.query_params['referral_id'] != '':
            queryset = queryset.filter(referral_id=request.query_params['referral_id'])
        if 'ref_id' in request.query_params and request.query_params['ref_id'] != '':
            if not ReferralMap.objects.filter(referral_id=request.query_params['ref_id']).exists():
                return HttpResponse('unknown referral_id', 501)
            user = ReferralMap.objects.get(referral_id=request.query_params['ref_id'])
            queryset = queryset.filter(referred_by=user.user_id.id)
        elif 'referred_by' in request.query_params:
            queryset = queryset.filter(referred_by=request.query_params['referred_by'])
        self.queryset = queryset
        return super().list(request, args, kwargs)


class ReferralTransViewSet(viewsets.ModelViewSet):
    queryset = ReferralTransaction.objects.all().order_by('id')
    serializer_class = ReferralTransSerializer

    @token_required
    def create(self, request, *args, **kwargs):
        if 'user_id' not in request.data:
            return HttpResponse('undefined user_id', 501)
        if ReferralMap.objects.filter(user_id=request.data['user_id']).exists():
            user = ReferralMap.objects.get(user_id=request.data['user_id'])
            request.data._mutable = True
            request.data['referred_by'] = user.referred_by.id
            request.data._mutable = False
        if 'amount' not in request.data:
            return HttpResponse('undefined amount', 502)
        amount = float(request.data['amount'])
        policies = ReferralPolicy.objects.all().order_by('limit_amount')
        bonus = 0.0
        for policy in policies:
            if policy.limit_amount > amount:
                continue
            if bonus < policy.bonus:
                bonus = policy.bonus
        request.data._mutable = True
        request.data['bonus'] = bonus
        request.data._mutable = False
        return super().create(request, args, kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        if 'user_id' in request.query_params:
            queryset = queryset.filter(user_id=request.query_params['user_id'])
        if 'ref_id' in request.query_params and request.query_params['ref_id'] != '':
            if not ReferralMap.objects.filter(referral_id=request.query_params['ref_id']).exists():
                return HttpResponse('unknown recruiter', 501)
            recruiter = ReferralMap.objects.get(referral_id=request.query_params['ref_id'])
            queryset = queryset.filter(referred_by=recruiter.user_id.id)
        elif 'referred_by' in request.query_params and request.query_params['referred_by'] != '':
            queryset = queryset.filter(referred_by=request.query_params['referred_by'])
        if 'status' in request.query_params:
            queryset = queryset.filter(status=request.query_params['status'])
        self.queryset = queryset
        return super().list(request, args, kwargs)

    @token_required
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, args, **kwargs)