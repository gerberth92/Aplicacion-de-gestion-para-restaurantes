from rest_framework import serializers
from .models import Bebidas

class BebidasSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Bebidas.

    Este serializador se utiliza para convertir instancias del modelo Bebidas en representaciones JSON y viceversa. 
    Permite la conversión entre los datos de la base de datos y los formatos de datos que pueden ser fácilmente 
    consumidos por los clientes, como JSON.

    Hereda de:
        serializers.ModelSerializer: Proporciona una manera conveniente de crear serializadores basados en modelos, 
        generando automáticamente la lógica de serialización y deserialización para los campos del modelo.

    Meta:
        model (Model): El modelo de Django al que se aplica el serializador. En este caso, es el modelo Bebidas.
        fields (list): La lista de campos del modelo que se incluirán en la representación del serializador. 
        En este caso, se incluyen todos los campos del modelo mediante el uso de '__all__'.
    """
    class Meta:
        model = Bebidas
        fields = '__all__'
