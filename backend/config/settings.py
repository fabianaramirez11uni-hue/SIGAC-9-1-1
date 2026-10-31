"""
==============================================================================
SIGAC 9-1-1 - CONFIGURACIÓN PRINCIPAL DE DJANGO (settings.py)
CCCT VEN 9-1-1 Barinas
Asignatura: Desarrollo de Aplicaciones I (7mo Semestre de Ingeniería Informática)
==============================================================================
Propósito:
Este módulo centraliza todas las directivas de funcionamiento del sistema web:
- Conexión a la base de datos relacional PostgreSQL.
- Políticas de seguridad, tokens y orígenes permitidos (CORS).
- Integración de Django REST Framework (DRF) para comunicación vía API.
- Configuración regional (Venezuela) y almacenamiento de archivos multimedia.
==============================================================================
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# ------------------------------------------------------------------------------
# 1. RUTAS BASE Y CARGA DE VARIABLES DE ENTORNO
# ------------------------------------------------------------------------------
# BASE_DIR apunta al directorio 'backend/'
BASE_DIR = Path(__file__).resolve().parent.parent

# Carga de variables sensibles desde el archivo .env ubicado en la raíz del proyecto.
# Esto asegura que ninguna credencial quede expuesta en el control de versiones (Git).
env_path = BASE_DIR.parent / '.env'
if env_path.exists():
    load_dotenv(env_path)
else:
    load_dotenv()

# ------------------------------------------------------------------------------
# 2. SEGURIDAD BÁSICA Y ENTORNO
# ------------------------------------------------------------------------------
# Clave criptográfica para firmas de sesiones y tokens (debe cambiarse en producción)
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-sigac-911-default-dev-key')

# Modo depuración: True en desarrollo (muestra traceback detallado ante errores).
# ADVERTENCIA: En un despliegue institucional real debe ser False para no filtrar información del servidor.
DEBUG = os.getenv('DEBUG', 'True') == 'True'

# Dominios y direcciones IP autorizadas para atender peticiones HTTP
ALLOWED_HOSTS = [host.strip() for host in os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1,backend').split(',')]

# ------------------------------------------------------------------------------
# 3. APLICACIONES INSTALADAS (INSTALLED_APPS)
# ------------------------------------------------------------------------------
INSTALLED_APPS = [
    # Módulos predeterminados de Django
    'django.contrib.admin',         # Panel administrativo preconstruido
    'django.contrib.auth',          # Sistema de autenticación de usuarios y permisos
    'django.contrib.contenttypes',    # Sistema de tipos de contenido genéricos
    'django.contrib.sessions',        # Gestión de sesiones de usuario en el servidor
    'django.contrib.messages',        # Notificaciones flash en vistas
    'django.contrib.staticfiles',     # Recolección y gestión de archivos estáticos (CSS/JS)

    # Librerías de terceros especializadas
    'rest_framework',                 # Django REST Framework para la arquitectura API
    'corsheaders',                    # Manejo de encabezados CORS (Cross-Origin Resource Sharing)

    # Aplicaciones modulares del negocio SIGAC 9-1-1
    'apps.accounts',                  # Usuarios, perfiles y roles institucionales (B.6, B.7, B.8)
    # - apps.activities: Planificación y ciclo de vida de actividades.
    # - apps.evidence: Carga validada de fotografías, videos y minutas.
    # - apps.publications: Seguimiento de difusión en redes sociales institucionales.
]

# ------------------------------------------------------------------------------
# 4. CAPA DE INTERCEPTACIÓN (MIDDLEWARE)
# ------------------------------------------------------------------------------
# Los middlewares procesan cada solicitud antes de llegar a la vista y cada respuesta antes de salir.
MIDDLEWARE = [
    # CorsMiddleware DEBE colocarse antes de CommonMiddleware para que los encabezados
    # Access-Control-Allow-Origin se adjunten correctamente a las respuestas de la API.
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',             # Protección contra ataques CSRF
    'django.contrib.auth.middleware.AuthenticationMiddleware', # Asocia el usuario autenticado a la 'request'
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware', # Protección contra incrustación en iframes maliciosos
]

# Archivo de enrutamiento raíz del proyecto
ROOT_URLCONF = 'config.urls'

# ------------------------------------------------------------------------------
# 5. MOTOR DE PLANTILLAS (TEMPLATES)
# ------------------------------------------------------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'], # Directorio de plantillas personalizadas si se requieren
        'APP_DIRS': True,                 # Busca carpetas 'templates/' dentro de cada app registrada
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Punto de entrada para servidores compatibles con WSGI (Gunicorn / uWSGI)
WSGI_APPLICATION = 'config.wsgi.application'

# ------------------------------------------------------------------------------
# 6. CONFIGURACIÓN DE BASE DE DATOS (PostgreSQL en Docker)
# ------------------------------------------------------------------------------
# Conexión directa al contenedor 'sigac_db' utilizando el adaptador psycopg2
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB', 'sigac_db'),
        'USER': os.getenv('POSTGRES_USER', 'sigac_admin'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'sigac_dev_pass_911'),
        'HOST': os.getenv('POSTGRES_HOST', 'db'),        # Nombre del servicio en docker-compose
        'PORT': os.getenv('POSTGRES_PORT', '5432'),
    }
}

# ------------------------------------------------------------------------------
# 7. MODELO DE USUARIO PERSONALIZADO Y CONTRASEÑAS (Requerimiento Académico B.6)
# ------------------------------------------------------------------------------
# Vincula el modelo extendido con los 4 roles (Administrador, Gestor, Usuario, Visitante)
AUTH_USER_MODEL = 'accounts.CustomUser'

# Garantiza que las credenciales de los funcionarios institucionales cumplan estándares de robustez
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ------------------------------------------------------------------------------
# 8. LOCALIZACIÓN E INTERNACIONALIZACIÓN (Venezuela / Barinas)
# ------------------------------------------------------------------------------
LANGUAGE_CODE = 'es-ve'              # Español adaptado a Venezuela
TIME_ZONE = 'America/Caracas'         # Zona horaria oficial para registrar fechas exactas de actividades
USE_I18N = True                       # Habilita el sistema de traducción
USE_TZ = True                         # Almacena fechas con zona horaria en PostgreSQL (UTC + conversión)

# ------------------------------------------------------------------------------
# 9. ARCHIVOS ESTÁTICOS Y MULTIMEDIA (Requerimiento Académico B.4)
# ------------------------------------------------------------------------------
# Archivos estáticos: CSS, JS e imágenes del diseño institucional del panel Django Admin
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static'] if (BASE_DIR / 'static').exists() else []

# Archivos multimedia: Evidencias fotográficas, videos e informes cargados por los usuarios
# Se guardan en el sistema de archivos del servidor (montado en volumen Docker) y NO en la BD
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ------------------------------------------------------------------------------
# 10. POLÍTICAS DE COMUNICACIÓN CORS (Integración con Vite.js)
# ------------------------------------------------------------------------------
# Permite que las solicitudes AJAX/Fetch desde el frontend sean aceptadas por Django
CORS_ALLOWED_ORIGINS = [
    origin.strip() for origin in os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173').split(',')
]
CORS_ALLOW_CREDENTIALS = True # Permite envío de cookies y cabeceras de autorización en peticiones

# ------------------------------------------------------------------------------
# 11. CONFIGURACIÓN DE DJANGO REST FRAMEWORK (DRF)
# ------------------------------------------------------------------------------
REST_FRAMEWORK = {
    # Por defecto, los endpoints pueden ser leídos si no son confidenciales,
    # pero cualquier creación/modificación exige autenticación válida
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    # Esquema de autenticación por sesión de Django (seguro contra ataques XSS mediante cookies HttpOnly)
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
}

# Tipo de clave primaria por defecto para modelos nuevos (Entero de 64 bits para alta escala)
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
