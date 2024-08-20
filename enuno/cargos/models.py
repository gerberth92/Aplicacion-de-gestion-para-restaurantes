from django.db import models

class Cargos(models.Model):
    id_cargos = models.AutoField(primary_key=True)
    cargo = models.CharField(db_column='Cargo', max_length=45)

    def __str__(self):
        return self.cargo
