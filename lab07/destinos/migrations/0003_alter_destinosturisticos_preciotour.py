# Generated by Django 5.0.6 on 2024-06-05 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destinos', '0002_rename_destino_destinosturisticos_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destinosturisticos',
            name='precioTour',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
