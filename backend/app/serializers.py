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
    # vendedor = serializers.SerializerMethodField()
    
    class Meta:
        model=Facturacion
        fields=('id','fecha','comentario','cantidad','id_vendedor', 'id_cliente', 'id_articulo' )
        extra_kwargs = {'email': {'required': True}, 
                        'id_vendedor': {'required': True}, 'id_cliente': {'required': True}, 'id_articulo': {'required': True}}
    
    # def get_vendedor(self, obj):
    #     vendedor_query = model.Vendedores.objects.filter(id_vendedor=obj.id)
    #     serializer = VendedoresSerializer(vendedor_query, many=True)
        
    #     return serializer.data