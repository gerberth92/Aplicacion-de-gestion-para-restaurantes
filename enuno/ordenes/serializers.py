from rest_framework import serializers
from .models import Ordenes


# Serializador para el modelo Ordenes
class OrdenesSerializer(serializers.ModelSerializer):
    id_mesa = serializers.IntegerField(source='id_pedido.id_mesa.id_mesa', read_only=True)

    class Meta:
        model = Ordenes
        fields = ['id', 'cantidad', 'precio', 'alimento', 'bebida', 'id_pedido', 'id_mesa', 'estado', 'observacion']
