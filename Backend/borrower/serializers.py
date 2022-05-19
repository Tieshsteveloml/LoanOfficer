from rest_framework import serializers
from .models import *


class BorrowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowerMaster
        fields = ('id', 'user_id', 'user_name', 'email', 'phone', 'password', 'is_email',
                  'is_active')