from rest_framework import serializers
from .models import Bebidas

def validar_precio(value):
    """
    Valida que el valor del precio no sea negativo.

    Este validador se asegura de que el valor del campo `precio` no sea menor que 0. 
    Si el valor es negativo, se lanza una excepción `ValidationError` con un mensaje 
    adecuado.

    Args:
        value (Decimal): El valor del precio a validar.

    Returns:
        Decimal: El valor del precio si es válido.

    Raises:
        serializers.ValidationError: Si el valor del precio es negativo.
    """
    if value is not None and value < 0:
        raise serializers.ValidationError("El precio no puede ser negativo.")
    return value

class BebidasSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Bebidas.

    Este serializador convierte instancias del modelo `Bebidas` en representaciones JSON 
    y viceversa. Utiliza `ModelSerializer` para proporcionar una implementación rápida 
    y simple para la serialización y deserialización de los datos del modelo.

    Campos personalizados:
        precio (DecimalField): Campo decimal con validación para asegurarse de que el 
        precio no sea negativo. Puede ser nulo y no es obligatorio.

    Atributos:
        Meta (class): Configuración del serializador que especifica el modelo asociado 
                      y los campos que deben incluirse en la serialización/deserialización.
    """

    precio = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[validar_precio],
        required=False,
        allow_null=True
    )

    class Meta:
        model = Bebidas
        fields = '__all__'
