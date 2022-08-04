from rest_framework import serializers
from .models import Clientes, Articulos, Vendedores, Facturacion

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
        

class FacturacionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Facturacion
        fields=('id','fecha','comentario','cantidad','accounting_entry_id', 'id_cliente', 'id_articulo','vendedor')
        extra_kwargs = {'email': {'required': True}, 
                        'id_vendedor': {'required': True}, 'id_cliente': {'required': True}, 'id_articulo': {'required': True}}
