from django.db import models
from alimentos.models import Alimentos
from bebidas.models import Bebidas
from pedidos.models import Pedidos

class Ordenes(models.Model):
    id = models.AutoField(primary_key=True)
    # Relación con Alimentos
    alimento = models.CharField(max_length=45, null=True, blank=True)
    
    # Relación con Bebidas
    bebida = models.CharField(max_length=45, null=True, blank=True)
    
    # Relación con Pedidos
    id_pedido = models.ForeignKey(Pedidos, on_delete=models.CASCADE, db_column='id_pedido', null=True)
    
    cantidad = models.IntegerField(db_column='cantidad')

    precio = models.DecimalField(db_column='precio', max_digits=10, decimal_places=2)

    estado = models.CharField(max_length=10, db_column='estado', null=True, blank=True)

    observacion = models.CharField(max_length=100, db_column='observacion', null=True, blank=True)


    def __str__(self):
        return self.id
