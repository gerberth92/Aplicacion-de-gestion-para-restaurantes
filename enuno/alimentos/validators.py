from rest_framework import serializers
import re

def validate_nombre(value):
    """
    Valida el campo nombre para asegurar que solo contenga caracteres alfanuméricos y espacios.

    Este validador utiliza una expresión regular para verificar que el valor
    del campo `nombre` solo contenga letras, números y espacios en blanco. 
    Si el valor no cumple con esta condición, se lanza una excepción 
    `ValidationError`.

    Args:
        value (str): El valor del campo nombre a validar.

    Returns:
        str: El valor del campo nombre si es válido.

    Raises:
        serializers.ValidationError: Si el valor contiene caracteres no permitidos.
    """
    if value and not re.match(r'^[\w\s]+$', value):
        raise serializers.ValidationError('El nombre solo puede contener letras, números y espacios.')
    return value

def validate_precio(value):
    """
    Valida el campo precio para asegurar que no sea negativo.

    Este validador verifica que el valor del campo `precio` no sea negativo. 
    Si el valor es menor que 0, se lanza una excepción `ValidationError`.

    Args:
        value (Decimal): El valor del campo precio a validar.

    Returns:
        Decimal: El valor del campo precio si es válido.

    Raises:
        serializers.ValidationError: Si el valor del precio es negativo.
    """
    if value is not None and value < 0:
        raise serializers.ValidationError('El precio no puede ser negativo.')
    return value

