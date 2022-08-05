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
    # obtener la data nombre mediante la relacion
    vendedor = serializers.CharField(source='id_vendedor.nombre', read_only=True)
    cliente = serializers.CharField(source='id_cliente.nombre_comercial', read_only=True)
    articulo = serializers.CharField(source='id_articulo.nombre', read_only=True)
    
    class Meta:
        model=Facturacion
        fields=('id','fecha','comentario','cantidad','accounting_entry_id','id_vendedor', 'id_cliente', 'id_articulo', 'vendedor', 'cliente', 'articulo')
        extra_kwargs = {'email': {'required': True}, 
                        'id_vendedor': {'required': True}, 'id_cliente': {'required': True}, 'id_articulo': {'required': True}}
