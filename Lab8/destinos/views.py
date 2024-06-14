import requests
from django.shortcuts import render, redirect, get_object_or_404
from .models import DestinosTuristicos, Comentario, Categoria
from .forms import DestinoForm, ComentarioForm, CategoriaForm
from django.http import HttpResponse
from django.template.loader import render_to_string, get_template
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from textwrap import wrap


def listar_destinos(request):
    destinos = DestinosTuristicos.objects.all()
    return render(request, 'destinos/listar.html', {'destinos': destinos})

def añadir_destino(request):
    if request.method == "POST":
        form = DestinoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('listar_destinos')
    else:
        form = DestinoForm()
    return render(request, 'destinos/añadir.html', {'form': form})

def modificar_destino(request, id):
    destino = DestinosTuristicos.objects.get(id=id)
    if request.method == "POST":
        form = DestinoForm(request.POST, request.FILES, instance=destino)
        if form.is_valid():
            form.save()
            return redirect('listar_destinos')
    else:
        form = DestinoForm(instance=destino)
    return render(request, 'destinos/modificar.html', {'form': form})

def eliminar_destino(request, id):
    destino = DestinosTuristicos.objects.get(id=id)
    if request.method == "POST":
        destino.delete()
        return redirect('listar_destinos')
    return render(request, 'destinos/eliminar.html', {'destino': destino})

def añadir_comentario(request, destino_id):
    destino = get_object_or_404(DestinosTuristicos, pk=destino_id)
    if request.method == "POST":
        form = ComentarioForm(request.POST)
        if form.is_valid():
            comentario = form.save(commit=False)
            comentario.destino = destino
            comentario.save()
            return redirect('detalles_destino', destino_id=destino.id)
    else:
        form = ComentarioForm()
    return render(request, 'destinos/añadir_comentario.html', {'form': form, 'destino': destino})

def eliminar_comentario(request, comentario_id):
    comentario = get_object_or_404(Comentario, pk=comentario_id)
    destino_id = comentario.destino.id
    comentario.delete()
    return redirect('detalles_destino', destino_id=destino_id)

def añadir_categoria(request):
    if request.method == "POST":
        form = CategoriaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_categorias')
    else:
        form = CategoriaForm()
    return render(request, 'destinos/añadir_categoria.html', {'form': form})

def listar_categorias(request):
    categorias = Categoria.objects.all()
    return render(request, 'destinos/listar_categorias.html', {'categorias': categorias})

def detalles_destino(request, destino_id):
    destino = get_object_or_404(DestinosTuristicos, pk=destino_id)
    comentarios = Comentario.objects.filter(destino=destino)
    return render(request, 'destinos/detalles_destino.html', {'destino': destino, 'comentarios': comentarios})

def generar_pdf(request, destino_id):
    destino = get_object_or_404(DestinosTuristicos, id=destino_id)

    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)

    width, height = letter

    p.drawString(100, 750, f"Detalles del Destino: {destino.nombreCiudad}")
    y = 730

    def draw_text(text, x, y, width, p):
        lines = wrap(text, width=80)
        for line in lines:
            p.drawString(x, y, line)
            y -= 15
        return y

    y = draw_text(f"Descripción: {destino.descripcionCiudad}", 100, y, width - 200, p)
    y -= 20 

    try:
        response = requests.get(destino.imagenCiudad)
        img = BytesIO(response.content)
        p.drawImage(img, 100, y - 100, width=400, height=300)  # Ajusta la posición y tamaño de la imagen según sea necesario
    except Exception as e:
        p.drawString(100, y - 100, "No se pudo cargar la imagen")
        print(f"Error al cargar la imagen: {e}")

    p.drawString(100, y, f"Precio: {destino.precioTour}")
    y -= 20
    p.drawString(100, y, f"Oferta: {'Sí' if destino.ofertaTour else 'No'}")

    p.showPage()
    p.save()

    buffer.seek(0)
    return HttpResponse(buffer, content_type='application/pdf')