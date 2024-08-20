from rest_framework import serializers
from .models import Ordenes


# Serializador para el modelo Ordenes
class OrdenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordenes
        fields = '__all__'
