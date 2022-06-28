from django.contrib import admin
from .models import Clientes, Articulos, Vendedores, Facturacion
# Register your models here.

admin.site.register(Clientes)
admin.site.register(Articulos)
admin.site.register(Vendedores)
admin.site.register(Facturacion)