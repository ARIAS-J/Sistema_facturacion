from django.db import models

# Create your models here.
class Clientes(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    nombre_comercial = models.CharField(max_length=250, null=True)
    rnc = models.CharField(max_length=250, null=True, unique=True)
    cuenta_contable = models.CharField(max_length=10, unique=True, null=True)
    estado = models.BooleanField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    update_At = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.nombre_comercial} {self.rnc}"

class Articulos(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=100, null=True)
    descripcion = models.TextField(max_length=255)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.BooleanField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    update_At = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.nombre} {self.precio_unitario}"

class Vendedores(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=100, null=True)
    porciento_comision = models.IntegerField()
    estado = models.BooleanField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    update_At = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.nombre} {self.porciento_comision}"

class Facturacion(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    fecha = models.DateTimeField(auto_now_add=True)
    comentario = models.TextField(max_length=255)
    cantidad = models.IntegerField(default=0)
    
    # Relationship
    id_vendedor = models.ForeignKey("Vendedores", on_delete=models.CASCADE, null=True, blank=True)
    id_cliente = models.ForeignKey("Clientes", on_delete=models.CASCADE, null=True, blank=True)
    id_articulo = models.ForeignKey("Articulos", on_delete=models.CASCADE, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    update_At = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.id} {self.fecha}"