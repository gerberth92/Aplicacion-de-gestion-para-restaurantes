# Generated by Django 5.0.7 on 2024-08-24 02:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bebidas', '0001_initial'),
        ('restaurantes', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bebidas',
            old_name='id_bebidas',
            new_name='id',
        ),
        migrations.AddField(
            model_name='bebidas',
            name='id_restaurante',
            field=models.ForeignKey(db_column='id_restaurante', null=True, on_delete=django.db.models.deletion.CASCADE, to='restaurantes.corp'),
        ),
    ]
