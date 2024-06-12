from django.db import models

# Canada se multicultural

# Create your models here.
class DestinosTuristicos(models.Model):
    nombreCiudad = models.CharField(max_length=100)
    descripcionCiudad = models.TextField()
    imagenCiudad = models.ImageField(upload_to='images/')
    precioTour = models.DecimalField(max_digits=10, decimal_places=2)
    ofertaTour = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.nombre

class Comentario(models.Model):
    destino = models.ForeignKey(DestinosTuristicos, on_delete=models.CASCADE)
    autor = models.CharField(max_length=100)
    contenido = models.TextField()
    fecha = models.DateTimeField()

    def __str__(self):
        return self.contenido[:50] + "..."
    
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    destinos = models.ManyToManyField(DestinosTuristicos)

    def __str__(self):
        return self.nombre