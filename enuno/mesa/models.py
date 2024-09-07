from django.db import models
from restaurantes.models import Corp
from usuarios.models import Usuarios


class Mesa(models.Model):
    id_mesa = models.AutoField(primary_key=True)
    id_restaurante = models.ForeignKey(Corp, on_delete=models.CASCADE, related_name='cantidadMesas')
    estado_enum_ocupada_disponible_field = models.CharField(db_column="Estado ENUM('ocupada', 'disponible')", max_length=10, default='disponible')
    id_mozo = models.ForeignKey(Usuarios, models.DO_NOTHING, db_column='id_mozo', null=True)
    id_pedido = models.ForeignKey('pedidos.Pedidos', models.DO_NOTHING, db_column='id_pedido', null=True)

    def __str__(self):
        return self.id_mesa
