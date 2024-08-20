from django.db import models
from pedidos.models import Pedidos  # Importar el modelo Pedidos desde api.pedidos
from ordenes.models import Ordenes  # Importar el modelo Ordenes desde api


class Caja(models.Model):
    id_caja = models.AutoField(primary_key=True)
    id_pedido = models.ForeignKey(Pedidos, models.DO_NOTHING, db_column='id_pedido', blank=True, null=True)
    id_ordenes = models.ForeignKey(Ordenes, models.DO_NOTHING, db_column='id_ordenes', null=True)
    total = models.IntegerField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.total
