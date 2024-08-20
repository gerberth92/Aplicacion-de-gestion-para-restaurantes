from django.urls import path
from alimentos.views import alimentos_list, alimentos_detail
from bebidas.views import list_bebidas, retrieve_bebida
from caja.views import list_caja, retrieve_caja
from pedidos.views import list_pedidos, retrieve_pedidos
from usuarios.views import UsuariosList, UsuariosDetail
from cargos.views import CargosList, CargosDetail
from login.views import LoginView
from mesa.views import MesaList, MesaDetail
from ordenes.views import OrdenesList, OrdenesDetail
from restaurantes.views import RestList, RestDetail


urlpatterns = [
    # URL para el login
    path('api/login/', LoginView.as_view(), name='login'),
    
    # URLs para gestionar el modelo restaurante
    path('api/rests/', RestList.as_view(), name='rest-list'),
    path('api/rests/<int:pk>/', RestDetail.as_view(), name='rest-detail'),
    
    # Alimentos URLs
    path('api/alimentos/', alimentos_list, name='alimentos-list'),
    path('api/alimentos/<int:pk>/', alimentos_detail, name='alimentos-detail'),
    
    # Bebidas URLs
    path('api/bebidas/', list_bebidas, name='bebidas-list'),
    path('api/bebidas/<int:pk>/', retrieve_bebida, name='bebida-detail'),
    
    # Caja URLs
    path('api/caja/', list_caja, name='caja-list'),
    path('api/caja/<int:pk>/', retrieve_caja, name='caja-detail'),
    
    # Pedidos URLs
    path('api/pedidos/', list_pedidos, name='pedidos-list'),
    path('api/pedidos/<int:pk>/', retrieve_pedidos, name='pedidos-detail'),
    
    # Usuarios URLs
    path('api/usuarios/', UsuariosList.as_view(), name='usuarios-list'),
    path('api/usuarios/<int:pk>/', UsuariosDetail.as_view(), name='usuarios-detail'),
    
    # URLs para gestionar el modelo Cargos
    path('api/cargos/', CargosList.as_view(), name='cargos-list'),
    path('api/cargos/<int:pk>/', CargosDetail.as_view(), name='cargos-detail'),
    
    # URLs para gestionar el modelo Mesa
    path('api/mesas/', MesaList.as_view(), name='mesa-list'),
    path('api/mesas/<int:pk>/', MesaDetail.as_view(), name='mesa-detail'),
    
    # URLs para gestionar el modelo Ordenes
    path('api/ordenes/', OrdenesList.as_view(), name='ordenes-list'),
    path('api/ordenes/<int:pk>/', OrdenesDetail.as_view(), name='ordenes-detail'),
]
