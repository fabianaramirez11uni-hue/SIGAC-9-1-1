// ==============================================================================
// SIGAC 9-1-1 - CONFIGURACIÓN DE VITE.JS (vite.config.js)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================
// Propósito:
// Configura el servidor de desarrollo de Vite, integrando el plugin oficial de React
// y asegurando la detección instantánea de cambios cuando se trabaja con Docker en Windows.
// ==============================================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Plugin oficial de React: compila JSX de forma ultrarrápida usando esbuild/Babel
  plugins: [react()],

  server: {
    // 0.0.0.0 permite que el servidor responda solicitudes provenientes fuera del contenedor
    host: '0.0.0.0',
    // Puerto estándar de desarrollo
    port: 5173,

    // Configuración fundamental para Docker en entornos Windows:
    // En Windows con WSL2 o volúmenes montados, los eventos del sistema de archivos
    // a veces no notifican al contenedor Linux. 'usePolling: true' revisa periódicamente
    // los archivos para que cualquier cambio en un componente se actualice en el navegador
    // al instante (Hot Module Replacement - HMR).
    watch: {
      usePolling: true,
    },
  },
})
