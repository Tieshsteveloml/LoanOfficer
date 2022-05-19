from rest_framework import serializers
from .models import *


class ReferralMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralMap
        fields = ('id', 'user_id', 'referral_id', 'referred_by', 'created_date')

    def to_representation(self, instance):
        my_fields = {'referral_id', 'referred_by'}
        data = super().to_representation(instance)
        for field in my_fields:
            try:
                if not data[field]:
                    data[field] = ""
            except KeyError:
                pass
        return data


class ReferralTransSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralTransaction
        fields = ('id', 'user_id', 'amount', 'created_date', 'bonus', 'status', 'paid_amount',
                  'paid_date', 'referred_by')

    def to_representation(self, instance):
        my_fields = {'referred_by'}
        data = super().to_representation(instance)
        for field in my_fields:
            try:
                if not data[field]:
                    data[field] = ""
            except KeyError:
                pass
        return data


class ReferralPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralPolicy
        fields = ('id', 'limit_amount', 'bonus')