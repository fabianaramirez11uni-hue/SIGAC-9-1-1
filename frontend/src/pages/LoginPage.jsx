// ==============================================================================
// SIGAC 9-1-1 - PANTALLA INDEPENDIENTE DE INICIO DE SESIÓN (LoginPage.jsx)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================

import React, { useState } from 'react'
import { 
  Lock, 
  User, 
  ArrowLeft, 
  AlertCircle, 
  ShieldCheck 
} from 'lucide-react'

export default function LoginPage({ onLoginSuccess, onNavigateToHome }) {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (response.ok) {
        onLoginSuccess(data.user)
      } else {
        setErrorMsg(data.non_field_errors?.[0] || data.detail || 'Usuario o contraseña incorrectos.')
      }
    } catch (err) {
      setErrorMsg('No se pudo conectar con el servidor backend. Verifique que los contenedores estén activos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E0B38] via-[#2D1052] to-[#140626] flex flex-col justify-center items-center p-4 relative font-sans text-slate-800">
      
      {/* Botón flotante para regresar al portal público */}
      <button 
        onClick={onNavigateToHome}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Portal Público</span>
      </button>

      {/* Contenedor Principal de Login */}
      <div className="max-w-md w-full space-y-6">
        
        {/* Emblema SIGAC 9-1-1 Transparente */}
        <div className="text-center space-y-3">
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-purple-400 to-brand-pinGreen-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
            <img 
              src="/logo-sigac.png" 
              alt="Logo SIGAC 9-1-1" 
              className="relative h-24 sm:h-28 w-auto mx-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] transform hover:scale-105 transition duration-300"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Acceso al Sistema Interno
          </h2>
          <p className="text-xs text-purple-200/80">
            Centro de Comando, Control y Telecomunicaciones • Barinas
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-purple-700" />
                Nombre de Usuario
              </label>
              <input 
                type="text"
                required
                placeholder="Ingrese su usuario institucional"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-600 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-purple-700" />
                Contraseña
              </label>
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-600 focus:border-transparent transition"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-purple-800 to-brand-purple-700 hover:from-brand-purple-900 hover:to-brand-purple-800 text-white font-bold text-xs shadow-lg shadow-brand-purple-900/30 transition active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Comprobando credenciales...' : 'Ingresar al Panel de Gestión'}
            </button>
          </form>

        </div>

        {/* Mensaje de Seguridad Institucional */}
        <div className="flex items-center justify-center gap-2 text-center text-xs text-purple-200/70">
          <ShieldCheck className="w-4 h-4 text-brand-pinGreen-400" />
          <span>Acceso cifrado y registrado conforme a normativas de seguridad institucional.</span>
        </div>

      </div>

    </div>
  )
}
