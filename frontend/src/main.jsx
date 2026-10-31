// ==============================================================================
// SIGAC 9-1-1 - PUNTO DE ENTRADA DE REACT (main.jsx)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================
// Propósito:
// Este script inicializa el DOM virtual de React y monta el componente principal
// <App /> dentro del elemento con id="root" definido en index.html.
// ==============================================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Importación de estilos globales de Tailwind

// 'createRoot' utiliza el nuevo motor concurrente de React 18 para un renderizado ultra eficiente
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> es una herramienta de desarrollo que ayuda a identificar
  // efectos secundarios y prácticas obsoletas ejecutando verificaciones adicionales en desarrollo
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
