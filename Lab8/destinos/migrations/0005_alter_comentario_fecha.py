# Generated by Django 5.0.6 on 2024-06-12 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destinos', '0004_categoria_comentario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentario',
            name='fecha',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]