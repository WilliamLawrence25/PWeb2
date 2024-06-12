from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_destinos, name='listar_destinos'),
    path('añadir/', views.añadir_destino, name='añadir_destino'),
    path('modificar/<int:id>/', views.modificar_destino, name='modificar_destino'),
    path('eliminar/<int:id>/', views.eliminar_destino, name='eliminar_destino'),
    path('comentario/añadir/<int:destino_id>/', views.añadir_comentario, name='añadir_comentario'),
    path('categoria/añadir/', views.añadir_categoria, name='añadir_categoria'), 
    path('categorias/', views.listar_categorias, name='listar_categorias'),
]
