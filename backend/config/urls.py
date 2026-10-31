"""
==============================================================================
SIGAC 9-1-1 - ENRUTAMIENTO PRINCIPAL DEL SISTEMA (urls.py)
CCCT VEN 9-1-1 Barinas
==============================================================================
Propósito:
Define las tablas de enrutamiento HTTP (URLs) del backend:
1. '/admin/': Panel de administración de Django para gestión interna de datos.
2. '/api/health/': Endpoint de monitoreo y verificación de estado (Health Check).
3. '/api/...': Rutas de los recursos de la API REST que consumirá el frontend.
==============================================================================
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

def health_check(request):
    """
    Controlador de comprobación de salud (Health Check).
    Responde un payload JSON ligero indicando que el backend está en línea,
    el nombre del sistema y la institución.
    Es utilizado por el frontend y por herramientas de monitoreo para comprobar
    que el servicio está operativo sin requerir autenticación.
    """
    return JsonResponse({
        'status': 'ok',
        'system': 'SIGAC 9-1-1',
        'institution': 'CCCT VEN 9-1-1 Barinas',
        'message': 'Backend operativo y listo para gestión comunicacional'
    })

# Lista de patrones de URL
urlpatterns = [
    # Panel administrativo de Django
    path('admin/', admin.site.urls),

    # Endpoint de comprobación de salud técnica
    path('api/health/', health_check, name='health_check'),

    # Módulo de Autenticación y Cuentas (B.6)
    path('api/auth/', include('apps.accounts.urls')),
]

# Configuración exclusiva para entorno de desarrollo:
# Django no está optimizado para servir archivos multimedia en producción;
# sin embargo, en desarrollo (DEBUG=True) permitimos que la URL /media/
# sirva directamente los archivos almacenados en la carpeta media/ del servidor.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
