# Generated by Django 4.0.5 on 2022-08-01 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_facturacion_accounting_entry_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facturacion',
            name='fecha',
            field=models.DateField(auto_now_add=True),
        ),
    ]