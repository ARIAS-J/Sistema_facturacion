from django.urls import path
from .views import ClienteList, Articulo, ClienteList, ClienteRetrieve, Vendedore, Facturacion
urlpatterns = [
    # Clientes
    path('clientes', ClienteList),
    path('clientes/<int:pk>/', ClienteRetrieve),
    # Articulos
    path('articulos', Articulo),
    path('vendedores', Vendedore),
    path('facturacion', Facturacion)
]
