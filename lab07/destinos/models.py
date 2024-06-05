from django.db import models

# Canada se multicultural

# Create your models here.
class DestinosTuristicos(models.Model):
    nombreCiudad = models.CharField(max_length=100)
    descripcionCiudad = models.TextField()
    imagenCiudad = models.ImageField(upload_to='images/')
    precioTour = models.DecimalField(max_digits=2, decimal_places=2)
    ofertaTour = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.nombre
