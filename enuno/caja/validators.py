from rest_framework import serializers
from .models import Caja
import datetime


class CajaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Caja.

    Convierte instancias del modelo Caja a JSON y viceversa, con validaciones adicionales para los campos.

    Hereda de:
        serializers.ModelSerializer: Serializador basado en el modelo de Django.

    Meta:
        model (Model): El modelo asociado es Caja.
        fields (list): Incluye los campos 'id_caja', 'id_pedido', 'id_ordenes', 'total', y 'fecha'.

    Métodos de validación:
        - validate_total(value): Asegura que 'total' sea un entero positivo.
        - validate_fecha(value): Asegura que 'fecha' no sea una fecha futura.
    """
    class Meta:
        model = Caja
        fields = ['id_caja', 'id_pedido', 'id_ordenes', 'total', 'fecha']

    def validate_total(self, value):
        """
        Valida que 'total' sea un entero positivo.
        
        Excepciones:
            serializers.ValidationError: Si el valor es negativo.
        """
        if value < 0:
            raise serializers.ValidationError("El total debe ser un número entero positivo.")
        return value

    def validate_fecha(self, value):
        """
        Valida que 'fecha' no sea una fecha futura.
        
        Excepciones:
            serializers.ValidationError: Si la fecha es en el futuro.
        """
        if value > datetime.date.today():
            raise serializers.ValidationError("La fecha no puede estar en el futuro.")
        return value
