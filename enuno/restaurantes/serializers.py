from rest_framework import serializers
from .models import Corp


class CorpSerializer(serializers.ModelSerializer):
    palabra_extra = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Corp
        fields = '__all__'
