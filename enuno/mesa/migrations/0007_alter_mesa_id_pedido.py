# Generated by Django 5.0.7 on 2024-08-26 16:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mesa', '0006_mesa_id_pedido'),
        ('pedidos', '0006_rename_estado_pedido_pedidos_estado_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mesa',
            name='id_pedido',
            field=models.ForeignKey(db_column='id_pedido', null=True, on_delete=django.db.models.deletion.SET_NULL, to='pedidos.pedidos'),
        ),
    ]
