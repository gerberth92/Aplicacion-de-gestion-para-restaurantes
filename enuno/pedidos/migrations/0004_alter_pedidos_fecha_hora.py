# Generated by Django 5.0.7 on 2024-08-25 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0003_rename_id_pedidos_pedidos_id_pedidos_id_restaurante_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedidos',
            name='fecha_hora',
            field=models.DateTimeField(auto_now_add=True, db_column='Fecha_hora'),
        ),
    ]
