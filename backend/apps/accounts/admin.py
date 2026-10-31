"""
==============================================================================
SIGAC 9-1-1 - CONFIGURACIÓN DE DJANGO ADMIN (apps/accounts/admin.py)
CCCT VEN 9-1-1 Barinas
Requerimiento Académico B.7
==============================================================================
Propósito:
Registra el modelo CustomUser en el panel de control administrativo de Django,
permitiendo a los Administradores gestionar funcionarios, autorizar cuentas,
asignar roles y visualizar métricas de auditoría.
==============================================================================
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """
    Panel administrativo personalizado para el modelo CustomUser del CCCT 9-1-1.
    """
    # Columnas que se mostrarán en la lista principal del Admin
    list_display = (
        'username', 
        'email', 
        'first_name', 
        'last_name', 
        'role', 
        'department', 
        'is_active', 
        'is_staff'
    )
    
    # Filtros laterales rápidos
    list_filter = ('role', 'is_active', 'is_staff', 'department', 'institution')
    
    # Campos por los que se puede buscar rápidamente
    search_fields = ('username', 'first_name', 'last_name', 'email', 'phone')
    
    # Orden predeterminado
    ordering = ('-date_joined',)

    # Secciones organizadas en el formulario de edición de usuario
    fieldsets = UserAdmin.fieldsets + (
        ('Datos Institucionales CCCT VEN 9-1-1', {
            'fields': ('role', 'institution', 'department', 'phone'),
            'classes': ('wide',),
        }),
    )

    # Campos que aparecen al crear un usuario nuevo desde el Admin
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Datos Institucionales CCCT VEN 9-1-1', {
            'fields': ('role', 'institution', 'department', 'phone', 'first_name', 'last_name', 'email'),
            'classes': ('wide',),
        }),
    )

