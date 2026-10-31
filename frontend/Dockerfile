# ==============================================================================
# SIGAC 9-1-1 - DOCKERFILE DEL FRONTEND (Vite.js + React + Tailwind CSS)
# CCCT VEN 9-1-1 Barinas
# ==============================================================================
# Propósito:
# Construye el contenedor de desarrollo del frontend utilizando la versión LTS
# de Node.js (versión 20) sobre una base ultraligera Alpine Linux.
# ==============================================================================

FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de manifiesto de dependencias:
# Al copiar package.json y package-lock.json por separado, Docker aprovecha su
# sistema de capas en caché: solo reinstalará paquetes ('npm install') si agregamos
# o quitamos una librería en package.json.
COPY package*.json ./

# Instalación de las dependencias de Node.js dentro del entorno aislado del contenedor
RUN npm install

# Copia todo el código fuente del frontend al contenedor
COPY . .

# Expone el puerto 5173 (puerto estándar de desarrollo de Vite)
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo:
# '-- --host 0.0.0.0' le indica a Vite que acepte conexiones desde cualquier IP,
# lo que permite que tu navegador en Windows pueda ver la página en localhost:5173.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
