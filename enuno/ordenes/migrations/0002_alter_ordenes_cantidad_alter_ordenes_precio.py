# Generated by Django 5.0.7 on 2024-08-25 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordenes',
            name='cantidad',
            field=models.IntegerField(db_column='cantidad'),
        ),
        migrations.AlterField(
            model_name='ordenes',
            name='precio',
            field=models.DecimalField(db_column='precio', decimal_places=2, max_digits=10),
        ),
    ]
