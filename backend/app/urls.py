from django.urls import path
from .views import ClienteList, ClienteRetrieve, ArticulosList, ArticulosRetrieve, VendedoresList, VendedoresRetrieve

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Clientes Endpoints
    path('clientes', ClienteList),
    path('clientes/<int:pk>/', ClienteRetrieve),
    # Articulos Endpoints
    path('articulos', ArticulosList),
    path('articulos/<int:pk>/', ArticulosRetrieve),
    # Vendedores Endpoints
    path('vendedores', VendedoresList),
    path('vendedores/<int:pk>/', VendedoresRetrieve),
    # Facturacion Endpoints
    # path('facturacion', FacturacionList),
    # path('facturacion/<int:pk>/', FacturacionRetrieve)
    
    # Token Endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
