# Generated by Django 5.0.7 on 2024-08-25 00:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0003_rename_id_ordenes_ordenes_id'),
        ('pedidos', '0003_rename_id_pedidos_pedidos_id_pedidos_id_restaurante_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordenes',
            name='id_pedidos',
            field=models.ForeignKey(db_column='id_pedidos', on_delete=django.db.models.deletion.CASCADE, to='pedidos.pedidos'),
        ),
    ]
