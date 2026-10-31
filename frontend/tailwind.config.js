// ==============================================================================
// SIGAC 9-1-1 - CONFIGURACIÓN DEL SISTEMA DE DISEÑO (Tailwind CSS)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================
// Propósito:
// Define la identidad visual institucional:
// 1. Tonos morados sobrios (base institucional de gestión).
// 2. Tonos pasteles y fondos claros para máxima legibilidad y descanso visual.
// 3. Verde lima vibrante (extraído del pin de ubicación del isotipo 9-1-1).
// 4. Rojo carmesí de alerta (extraído del centro del logo 9-1-1 para estados críticos).
// ==============================================================================

/** @type {import('tailwindcss').Config} */
export default {
  // Rutas que Tailwind analiza para detectar las clases CSS utilizadas y generar
  // un archivo final optimizado y ligero (árbol de estilos sin código no usado).
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Escala cromática de morados institucionales
          purple: {
            50: '#FBF8FF',   // Fondo sutil pastel
            100: '#F3E8FF',  // Fondos de tarjetas y chips suaves
            200: '#E9D5FF',  // Bordes sutiles
            300: '#D8B4FE',  // Hover de elementos interactivos
            400: '#C084FC',
            500: '#9333EA',  // Morado vibrante para acentos
            600: '#7E22CE',  // Primario para botones destacados
            700: '#6B21A8',  // Encabezados y títulos
            800: '#4C1D95',  // Fondos oscuros de barras laterales
            900: '#2E1065',  // Morado noche institucional profundo
          },
          // Acento verde lima: Extraído directamente del pin del logo 9-1-1
          // Se utiliza para estados de éxito, actividades "Ejecutadas" y badges de conexión
          pinGreen: {
            300: '#86EFAC',
            400: '#6EE7B7',
            500: '#65CC0B',  // Tono verde lima representativo del isotipo
            600: '#52A708',
          },
          // Acento rojo de alerta: Extraído del círculo central del logo 9-1-1
          // Se utiliza para actividades "Suspendidas", publicaciones pendientes y emergencias
          alertRed: {
            100: '#FEE2E2',  // Fondo suave para avisos de alerta
            400: '#F87171',
            500: '#C5221F',  // Rojo institucional del botón de emergencia
            600: '#991B1B',
          },
          // Paleta de superficies pasteles para descanso visual (Clean UI)
          pastel: {
            bg: '#F9F8FD',        // Fondo general de la página (muy descansado)
            card: '#FFFFFF',      // Superficie limpia de tarjetas
            lavender: '#EDE9FE',  // Separadores y acentos suaves
            border: '#E2E8F0',    // Líneas divisorias de tablas y formularios
          }
        }
      },
      fontFamily: {
        // Tipografía sans-serif moderna 'Inter' con respaldo del sistema
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
