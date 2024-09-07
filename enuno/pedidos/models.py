from django.db import models
from usuarios.models import Usuarios  # Importar el modelo Usuarios desde api.usuarios
from mesa.models import Mesa  # Importar el modelo Mesa desde api
from restaurantes.models import Corp


class Pedidos(models.Model):
    id = models.AutoField(primary_key=True)
    id_restaurante = models.ForeignKey(Corp, models.DO_NOTHING, db_column='id_restaurante', null=True)
    id_usuario = models.ForeignKey(Usuarios, models.DO_NOTHING, db_column='id_usuario', null=True)  # Usar el modelo Usuarios desde api.usuarios
    id_mesa = models.ForeignKey(Mesa, models.DO_NOTHING, db_column='id_mesa', null=True)  # Usar el modelo Mesa desde api
    fecha_hora = models.DateTimeField(db_column='Fecha_hora', auto_now_add=True)  # Field name made lowercase.
    estado = models.CharField(db_column='estado', max_length=10, blank=True, null=True)  # Field name made lowercase.

    def __str__(self):
        return self.id
