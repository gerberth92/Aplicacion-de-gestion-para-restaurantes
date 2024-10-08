# Generated by Django 5.0.7 on 2024-08-23 16:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0002_pedidos_id_mesa_pedidos_id_usuario'),
        ('restaurantes', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pedidos',
            old_name='id_pedidos',
            new_name='id',
        ),
        migrations.AddField(
            model_name='pedidos',
            name='id_restaurante',
            field=models.ForeignKey(db_column='id_restaurante', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='restaurantes.corp'),
        ),
        migrations.AddField(
            model_name='pedidos',
            name='numero_pedido',
            field=models.IntegerField(null=True, unique=True),
        ),
    ]
