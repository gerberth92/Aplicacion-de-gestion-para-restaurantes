from rest_framework import serializers
from .models import Cargos


class CargosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargos
        fields = '__all__'
