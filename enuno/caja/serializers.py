from rest_framework import serializers
from .models import Caja

class CajaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Caja.

    Este serializador se utiliza para convertir instancias del modelo Caja en representaciones JSON y viceversa.
    Permite la conversión entre los datos de la base de datos y los formatos de datos que pueden ser fácilmente 
    consumidos por los clientes, como JSON.

    Hereda de:
        serializers.ModelSerializer: Proporciona una manera conveniente de crear serializadores basados en modelos, 
        generando automáticamente la lógica de serialización y deserialización para los campos del modelo.

    Meta:
        model (Model): El modelo de Django al que se aplica el serializador. En este caso, es el modelo Caja.
        fields (list): La lista de campos del modelo que se incluirán en la representación del serializador. 
        En este caso, se incluyen explícitamente los campos 'id_caja', 'id_pedido', 'id_ordenes', 'total', y 'fecha'.
    """
    class Meta:
        model = Caja
        fields = ['id_caja', 'id_pedido', 'id_ordenes', 'total', 'fecha']
