from django.shortcuts import render

from django.shortcuts import render, redirect
from .models import Destino
from .forms import DestinoForm

def listar_destinos(request):
    destinos = Destino.objects.all()
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
    destino = Destino.objects.get(id=id)
    if request.method == "POST":
        form = DestinoForm(request.POST, request.FILES, instance=destino)
        if form.is_valid():
            form.save()
            return redirect('listar_destinos')
    else:
        form = DestinoForm(instance=destino)
    return render(request, 'destinos/modificar.html', {'form': form})

def eliminar_destino(request, id):
    destino = Destino.objects.get(id=id)
    if request.method == "POST":
        destino.delete()
        return redirect('listar_destinos')
    return render(request, 'destinos/eliminar.html', {'destino': destino})