from django.shortcuts import render, redirect, get_object_or_404
from .models import DestinosTuristicos, Comentario, Categoria
from .forms import DestinoForm, ComentarioForm, CategoriaForm
from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML

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
    html_string = render_to_string('destinos/pdf_template.html', {'destino':destino})
    html = HTML(string=html_string)
    response = HttpResponse(content_type='aplication_pdf')
    response['Content-Disposition'] = f'attachment; filename="destino_{destino_id}.pdf"'
    html.white_pdf(response)
    return response