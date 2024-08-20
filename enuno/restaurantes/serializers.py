from rest_framework import serializers
from .models import Corp


class CorpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Corp
        fields = '__all__'
