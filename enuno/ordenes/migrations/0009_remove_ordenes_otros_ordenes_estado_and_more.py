# Generated by Django 5.0.7 on 2024-08-27 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0008_alter_ordenes_otros'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordenes',
            name='otros',
        ),
        migrations.AddField(
            model_name='ordenes',
            name='estado',
            field=models.CharField(blank=True, db_column='estado', max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='ordenes',
            name='observacion',
            field=models.CharField(blank=True, db_column='observacion', max_length=100, null=True),
        ),
    ]
