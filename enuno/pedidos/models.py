from django.db import models
from usuarios.models import Usuarios  # Importar el modelo Usuarios desde api.usuarios
from mesa.models import Mesa  # Importar el modelo Mesa desde api


class Pedidos(models.Model):
    id_pedidos = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuarios, models.DO_NOTHING, db_column='id_usuario', null=True)  # Usar el modelo Usuarios desde api.usuarios
    id_mesa = models.ForeignKey(Mesa, models.DO_NOTHING, db_column='id_mesa', null=True)  # Usar el modelo Mesa desde api
    fecha_hora = models.DateTimeField(db_column='Fecha_hora')  # Field name made lowercase.
    estado_pedido = models.CharField(db_column='Estado_pedido', max_length=10, blank=True, null=True)  # Field name made lowercase.

    def __str__(self):
        return self.id_pedidos
