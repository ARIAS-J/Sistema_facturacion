# Generated by Django 4.0.5 on 2022-08-04 19:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_facturacion_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facturacion',
            name='cantidad',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]
