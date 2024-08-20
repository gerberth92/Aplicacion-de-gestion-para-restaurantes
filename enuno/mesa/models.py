from django.db import models


class Mesa(models.Model):
    id_mesa = models.AutoField(primary_key=True)
    estado_enum_ocupada_disponible_field = models.CharField(db_column="Estado ENUM('ocupada', 'disponible')", max_length=45)

    def __str__(self):
        return self.id_mesa
