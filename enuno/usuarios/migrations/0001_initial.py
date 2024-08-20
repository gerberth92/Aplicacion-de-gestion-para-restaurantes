# Generated by Django 5.0.7 on 2024-08-19 21:18

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator(code='invalid_alpha', message='No se permiten espacios ni caracteres no alfabéticos', regex='^[a-zA-Z]+$')])),
                ('apellido', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator(code='invalid_alpha', message='No se permiten espacios ni caracteres no alfabéticos', regex='^[a-zA-Z]+$')])),
                ('dni', models.CharField(max_length=8, unique=True, validators=[django.core.validators.RegexValidator(code='invalid_dni', message='El DNI debe contener exactamente 8 dígitos', regex='^\\d{8}$')])),
                ('puesto', models.CharField(max_length=8)),
                ('user', models.CharField(editable=False, max_length=18, unique=True)),
                ('cont', models.CharField(max_length=18, unique=True)),
            ],
        ),
    ]
