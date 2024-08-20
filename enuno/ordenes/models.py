from django.db import models

class Ordenes(models.Model):
    id_ordenes = models.AutoField(primary_key=True)
    
    # Relación con Alimentos
    id_alimentos = models.ForeignKey('alimentos.Alimentos', models.DO_NOTHING, db_column='id_alimentos')
    
    # Relación con Bebidas
    id_bebidas = models.ForeignKey('bebidas.Bebidas', models.DO_NOTHING, db_column='id_bebidas')
    
    # Relación con Pedidos
    id_pedidos = models.ForeignKey('pedidos.Pedidos', models.DO_NOTHING, db_column='id_pedidos')
    
    cantidad = models.IntegerField(db_column='Cantidad')  # Field name made lowercase.
    precio = models.DecimalField(db_column='Precio', max_digits=10, decimal_places=2)

    def __str__(self):
        return self.id_ordenes
