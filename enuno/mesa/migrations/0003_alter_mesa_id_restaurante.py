# Generated by Django 5.0.7 on 2024-08-20 20:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mesa', '0002_mesa_id_restaurante_and_more'),
        ('restaurantes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mesa',
            name='id_restaurante',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='cantidadMesas', to='restaurantes.corp'),
            preserve_default=False,
        ),
    ]
