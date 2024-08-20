from rest_framework import serializers
from .models import Pedidos  

class PedidosSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Pedidos.

    Este serializador convierte instancias del modelo Pedidos a JSON y viceversa.

    Meta:
        model (Model): El modelo asociado es Pedidos.
        fields (list): Incluye los campos 'id_pedidos', 'id_usuario', 'id_mesa', 'fecha_hora', y 'estado_pedido'.
    """
    class Meta:
        model = Pedidos
        fields = ['id_pedidos', 'id_usuario', 'id_mesa', 'fecha_hora', 'estado_pedido']
