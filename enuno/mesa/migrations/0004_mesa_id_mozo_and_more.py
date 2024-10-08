# Generated by Django 5.0.7 on 2024-08-24 17:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mesa', '0003_alter_mesa_id_restaurante'),
        ('usuarios', '0002_usuarios_id_restaurante'),
    ]

    operations = [
        migrations.AddField(
            model_name='mesa',
            name='id_mozo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='usuarios.usuarios'),
        ),
        migrations.AlterField(
            model_name='mesa',
            name='estado_enum_ocupada_disponible_field',
            field=models.CharField(db_column="Estado ENUM('ocupada', 'disponible')", default='disponible', max_length=10),
        ),
    ]
