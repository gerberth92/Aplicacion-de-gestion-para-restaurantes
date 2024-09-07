from django.db import models
from restaurantes.models import Corp


class Bebidas(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    id_restaurante = models.ForeignKey(Corp, on_delete=models.CASCADE, db_column='id_restaurante', null=True)

    def __str__(self):
        return self.nombre
