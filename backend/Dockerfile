# ==============================================================================
# SIGAC 9-1-1 - DOCKERFILE DEL BACKEND (Django + DRF)
# CCCT VEN 9-1-1 Barinas
# ==============================================================================
# Propósito:
# Construye la imagen Docker del backend a partir de Debian Linux con Python 3.12.
# 'slim' proporciona una imagen pequeña, segura y con las librerías base necesarias.
# ==============================================================================

FROM python:3.12-slim

# Variables de entorno para optimizar la ejecución de Python en contenedores:
# 1. PYTHONDONTWRITEBYTECODE=1: Evita que Python cree archivos .pyc en disco (ahorra I/O y espacio).
# 2. PYTHONUNBUFFERED=1: Envía los prints y logs directamente a la terminal sin pasar por búfer.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo dentro del contenedor donde residirá el código fuente
WORKDIR /app

# Instalación de paquetes del sistema operativo:
# - gcc: compilador de C necesario para compilar librerías de Python.
# - libpq-dev: cabeceras de desarrollo de PostgreSQL necesarias para la librería psycopg2.
# Se limpia la caché de apt (/var/lib/apt/lists/*) para mantener la imagen lo más ligera posible.
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar primero únicamente el archivo de requerimientos:
# Esta es una buena práctica de Docker (Cache Layering). Al copiar solo requirements.txt,
# Docker almacena en caché la instalación de dependencias y solo la vuelve a ejecutar
# si este archivo cambia, ahorrando tiempo en cada 'docker-compose build'.
COPY requirements.txt /app/

# Actualizar el gestor de paquetes pip e instalar las dependencias de Python
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código del backend al contenedor
COPY . /app/

# Documentar que el contenedor escucha peticiones en el puerto 8000
EXPOSE 8000

# Comando por defecto que se ejecuta al levantar el contenedor:
# Inicia el servidor de desarrollo de Django escuchando en todas las interfaces de red (0.0.0.0)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
