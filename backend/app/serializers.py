from rest_framework import serializers
from .models import Clientes, Articulos, Vendedores

class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Clientes
        fields=('id', 'nombre_comercial', 'rnc', 'cuenta_contable', 'estado')

class ArticulosSerializer(serializers.ModelSerializer):
    class Meta:
        model=Articulos
        fields=('id', 'nombre', 'descripcion', 'precio_unitario', 'estado')

class VendedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vendedores
        fields=('id','nombre', 'porciento_comision', 'estado')
        extra_kwargs = {'email': {'required': True}}
        

# class FacturacionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Facturacion
#         fields='__all__'