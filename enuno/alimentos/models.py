from django.db import models


class Alimentos(models.Model):
    id_alimentos = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.nombre
