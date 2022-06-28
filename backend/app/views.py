from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClientesSerializer, ArticulosSerializer, VendedoresSerializer, FacturacionSerializer
from .models import Clientes, Articulos, Vendedores, Facturacion

# Listar todos los clientes
@api_view(['GET', 'POST'])
def ClienteList(request):
    # List
    if request.method == 'GET':
        # Queryset
        clientes = Clientes.objects.all()
        # Serializer
        serializer = ClientesSerializer(clientes,  many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Create
    elif request.method == 'POST':
        serializer = ClientesSerializer(data=request.data)
        
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


# Listar un solo cliente
@api_view(['GET','PUT', 'DELETE'])
def ClienteRetrieve(request, pk = None):
    # Queryset
    cliente = Clientes.objects.filter(id = pk).first()
    
    # Validacion
    if cliente:
        
        # Retrieve
        if request.method == 'GET':
            # Serializer
            serializer = ClientesSerializer(cliente)
            return Response(serializer.data)

        # Update
        elif request.method == 'PUT':
            # Serializer   
            serializer = ClientesSerializer(cliente, data=request.data)
            
            # Validacion
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)

        # Delete
        elif request.method == 'DELETE':
            cliente.delete()
            return Response({'messagee':'Cliente eliminado correctamente'}, )

    return Response({'message':'No se ha encontrado un cliente'})


def ArticulosList(request):
    pass

def ArticulosRetrieve(request):
    pass

def VendedoresList(request):
    pass

def VendedoresRetrieve(request):
    pass

def FacturacionList(request):
    pass

def FacturacionRetrieve(request):
    pass