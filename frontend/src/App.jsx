// ==============================================================================
// SIGAC 9-1-1 - ENRUTADOR PRINCIPAL DE LA APLICACIÓN (App.jsx)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================

import React, { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  // 'home' | 'login' | 'dashboard'
  const [currentView, setCurrentView] = useState('home')
  const [currentUser, setCurrentUser] = useState(null)
  const [loadingInitial, setLoadingInitial] = useState(true)

  // Verificar si ya existe una sesión activa al cargar la aplicación
  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/me/')
        if (response.ok) {
          const data = await response.json()
          if (data.is_authenticated && data.user) {
            setCurrentUser(data.user)
            setCurrentView('dashboard') // Redirección automática si ya está autenticado
          } else {
            setCurrentUser(null)
            setCurrentView('home') // Portal público institucional por defecto
          }
        }
      } catch (err) {
        console.log('Servicio backend inicializando...')
        setCurrentView('home')
      } finally {
        setLoadingInitial(false)
      }
    }

    checkActiveSession()
  }, [])

  // Manejador tras inicio de sesión exitoso
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData)
    setCurrentView('dashboard') // REDIRECCIÓN al panel interno
  }

  // Manejador de cierre de sesión
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/auth/logout/', { method: 'POST' })
    } catch (err) {
      console.log('Error al cerrar sesión en el servidor')
    }
    setCurrentUser(null)
    setCurrentView('home') // REDIRECCIÓN de vuelta al portal público
  }

  if (loadingInitial) {
    return (
      <div className="min-h-screen bg-[#1E0B38] flex flex-col items-center justify-center text-white space-y-4">
        <img 
          src="/logo-sigac.png" 
          alt="Cargando SIGAC 9-1-1" 
          className="h-20 w-auto animate-pulse drop-shadow-lg"
        />
        <div className="flex items-center gap-2 text-xs text-purple-200">
          <span className="w-2 h-2 rounded-full bg-brand-pinGreen-500 animate-ping"></span>
          <span>Conectando con el CCCT VEN 9-1-1 Barinas...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* VISTA 1: Portal Público Institucional */}
      {currentView === 'home' && (
        <HomePage 
          onNavigateToLogin={() => setCurrentView('login')} 
        />
      )}

      {/* VISTA 2: Pantalla Independiente de Inicio de Sesión */}
      {currentView === 'login' && (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess}
          onNavigateToHome={() => setCurrentView('home')}
        />
      )}

      {/* VISTA 3: Panel de Control Interno (Redirección tras iniciar sesión) */}
      {currentView === 'dashboard' && currentUser && (
        <DashboardPage 
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}
