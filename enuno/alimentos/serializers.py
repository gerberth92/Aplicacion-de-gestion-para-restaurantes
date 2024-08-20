from rest_framework import serializers
from .models import Alimentos

class AlimentosSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Alimentos.

    Este serializador convierte instancias del modelo `Alimentos` 
    en representaciones JSON y viceversa. Utiliza `ModelSerializer` 
    para proporcionar una implementación rápida y simple para la 
    serialización y deserialización de los datos del modelo.

    Atributos:
        Meta (class): Configuración del serializador que especifica el 
                      modelo asociado y los campos que deben incluirse 
                      en la serialización/deserialización. En este caso, 
                      se incluyen todos los campos del modelo `Alimentos`.
    """
    
    class Meta:
        model = Alimentos
        fields = '__all__'
