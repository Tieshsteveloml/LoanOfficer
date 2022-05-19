from rest_framework import serializers
from .models import *


class NPSSerializer(serializers.ModelSerializer):
    class Meta:
        model = NPS
        fields = ('id', 'user_id', 'score', 'description', 'sender_id', 'published', 'date')


class TellUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TellUs
        fields = ('id', 'name', 'max_score', 'description')