from django.db import models

# Canada se multicultural

# Create your models here.
class Destino(models.Model):
    nombre = models.CharField(max_length=100)
    destino = models.TextField()
    image = models.ImageField(upload_to='images/')
    precio = models.DecimalField(max_digits=2, decimal_places=2)
    oferta = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.nombre
