// ==============================================================================
// SIGAC 9-1-1 - CONFIGURACIÓN DE POSTCSS (postcss.config.js)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================
// Propósito:
// PostCSS procesa las reglas CSS antes de enviarlas al navegador:
// 1. tailwindcss: interpreta las directivas de utilidad de Tailwind (@tailwind).
// 2. autoprefixer: añade automáticamente los prefijos de compatibilidad de los
//    navegadores (-webkit-, -moz-, etc.) asegurando soporte multiplataforma y móvil.
// ==============================================================================

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
