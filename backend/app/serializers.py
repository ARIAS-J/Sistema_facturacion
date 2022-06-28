from rest_framework import serializers
from .models import Clientes, Articulos, Vendedores, Facturacion


class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Clientes
        fields='__all__'

class ArticulosSerializer(serializers.ModelSerializer):
    class Meta:
        model=Articulos
        fields='__all__'

class VendedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vendedores
        fields='__all__'

class FacturacionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Facturacion
        fields='__all__'