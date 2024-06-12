from django import forms
from .models import DestinosTuristicos, Comentario, Categoria

class DestinoForm(forms.ModelForm):
    class Meta:
        model = DestinosTuristicos
        fields = ['nombreCiudad', 'descripcionCiudad', 'imagenCiudad', 'precioTour', 'ofertaTour']

class ComentarioForm(forms.ModelForm):
    class Meta:
        model = Comentario
        fields = ['autor', 'contenido']

class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ['nombre', 'destinos']