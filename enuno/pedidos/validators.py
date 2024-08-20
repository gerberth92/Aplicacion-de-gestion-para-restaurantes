from django.core.exceptions import ValidationError
from django.db import models

def validate_estado_pedido(value):
    """
    Valida el estado del pedido, permitiendo solo ciertos valores.
    """
    estados_validos = ['Pendiente', 'Completado', 'Cancelado']
    if value not in estados_validos:
        raise ValidationError(f'Estado de pedido no válido: {value}')

class Pedidos(models.Model):
    """
    Modelo para representar pedidos.

    Atributos:
        - id_pedidos: ID único del pedido.
        - id_usuario: ID del usuario que realizó el pedido.
        - id_mesa: ID de la mesa asociada al pedido.
        - fecha_hora: Fecha y hora del pedido.
        - estado_pedido: Estado del pedido, validado con una lista de estados permitidos.
    """
    id_pedidos = models.AutoField(primary_key=True)
    id_usuario = models.IntegerField()
    id_mesa = models.IntegerField()
    fecha_hora = models.DateTimeField(db_column='Fecha_hora', blank=True, null=True)
    estado_pedido = models.CharField(
        db_column='Estado_pedido', 
        max_length=10, 
        blank=True, 
        null=True, 
        validators=[validate_estado_pedido]
    )

    class Meta:
        managed = False
        db_table = 'pedidos'
