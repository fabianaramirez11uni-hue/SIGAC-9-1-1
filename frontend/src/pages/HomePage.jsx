// ==============================================================================
// SIGAC 9-1-1 - PÁGINA PÚBLICA INSTITUCIONAL (HomePage.jsx)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================

import React from 'react'
import { 
  ShieldCheck, 
  LogIn, 
  PhoneCall, 
  Radio, 
  Calendar, 
  HeartHandshake, 
  Car, 
  Flame, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react'

export default function HomePage({ onNavigateToLogin }) {
  return (
    <div className="min-h-screen bg-[#FBF9FE] text-slate-800 flex flex-col font-sans">
      
      {/* ----------------------------------------------------------------------
          1. BARRA DE NAVEGACIÓN PÚBLICA
          ---------------------------------------------------------------------- */}
      <header className="bg-white/90 backdrop-blur-md border-b border-brand-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Emblema SIGAC 9-1-1 Transparente */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-pinGreen-500 to-brand-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              <img 
                src="/logo-sigac.png" 
                alt="Emblema SIGAC 9-1-1" 
                className="relative h-14 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-purple-900 via-brand-purple-700 to-brand-purple-900 bg-clip-text text-transparent">
                  SIGAC 9-1-1
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-pinGreen-500/15 text-brand-pinGreen-600 font-semibold border border-brand-pinGreen-500/30">
                  CCCT Barinas
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Gestión y Seguimiento de Actividades Comunicacionales
              </p>
            </div>
          </div>

          {/* Botón de Acceso al Sistema */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-purple-50 text-brand-purple-800 border border-brand-purple-200/60 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-pinGreen-500 animate-pulse"></span>
              Línea Única de Emergencias: 9-1-1
            </div>

            <button 
              onClick={onNavigateToLogin}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purple-700 hover:bg-brand-purple-800 text-white font-semibold text-xs shadow-md shadow-brand-purple-700/20 transition active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Acceso al Personal</span>
            </button>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------------
          2. SECCIÓN PRINCIPAL HERO
          ---------------------------------------------------------------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple-900 via-brand-purple-800 to-brand-purple-950 text-white p-8 sm:p-12 shadow-xl shadow-brand-purple-900/10">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-brand-pinGreen-500/15 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-purple-200">
                <ShieldCheck className="w-4 h-4 text-brand-pinGreen-400" />
                Centro de Comando, Control y Telecomunicaciones • Estado Barinas
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Sistema Institucional de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-brand-pinGreen-300">
                  Gestión Comunicacional
                </span>
              </h1>

              <p className="text-purple-200/90 text-sm sm:text-base leading-relaxed">
                Plataforma interna del CCCT VEN 9-1-1 Barinas para la organización, registro, archivo de evidencias audiovisuales y seguimiento de actividades de seguridad ciudadana, jornadas comunitarias y cobertura de prensa.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button 
                  onClick={onNavigateToLogin}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-pinGreen-500 hover:bg-brand-pinGreen-600 text-white font-bold text-xs shadow-lg shadow-brand-pinGreen-500/25 transition active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  Iniciar Sesión en el Panel
                </button>

                <a 
                  href="#servicios"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition"
                >
                  Conocer Servicios Institucionales
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Emblema oficial flotante con transparencia */}
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple-400/40 via-brand-pinGreen-400/30 to-brand-purple-500/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-500"></div>
              <img 
                src="/logo-sigac.png" 
                alt="Emblema Oficial SIGAC 9-1-1" 
                className="relative w-72 sm:w-80 lg:w-96 h-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.4)] transform hover:scale-[1.02] transition duration-300"
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            3. SERVICIOS INSTITUCIONALES DEL VEN 9-1-1
            ---------------------------------------------------------------------- */}
        <section id="servicios" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Coordinación y Despacho de Emergencias
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              El CCCT VEN 9-1-1 Barinas centraliza la atención de incidencias en articulación con los Órganos de Seguridad Ciudadana (OSC) y Gestión de Riesgo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-brand-purple-100 shadow-sm hover:border-brand-purple-300 transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-purple-100 text-brand-purple-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Seguridad Ciudadana</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Atención y respuesta coordinada ante situaciones de auxilio, orden público y prevención comunitaria.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-purple-100 shadow-sm hover:border-brand-purple-300 transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-pinGreen-500/15 text-brand-pinGreen-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Emergencias Médicas</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Despacho de ambulancias, auxilio prehospitalario y traslado de pacientes en situaciones críticas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-purple-100 shadow-sm hover:border-brand-purple-300 transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-alertRed-100 text-brand-alertRed-600 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Protección y Bomberos</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Coordinación operativa en conflagraciones, rescates, desastres naturales y contingencias climáticas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-purple-100 shadow-sm hover:border-brand-purple-300 transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Tránsito y Vialidad</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Monitoreo, despeje de vías principales y asistencia ante accidentes vehiculares en el Estado Barinas.
              </p>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------
            4. CARTELERA COMUNITARIA INFORMATIVA
            ---------------------------------------------------------------------- */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-brand-purple-50 via-white to-brand-purple-50 border border-brand-purple-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-purple-100 text-brand-purple-800">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Cartelera Informativa y Campañas de Concientización
              </h3>
              <p className="text-xs text-slate-500">
                Información pública sobre actividades escolares y talleres del CCCT VEN 9-1-1
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-pinGreen-500/15 text-brand-pinGreen-600">
                Campaña Preventiva
              </span>
              <h4 className="font-bold text-xs text-slate-900">Uso Responsable de la Línea Única para Llamadas de Emergencia 9-1-1</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Evita realizar llamadas falsas o no urgentes. Cada llamada innecesaria puede retrasar la asistencia vital a personas en situaciones reales de peligro.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-purple-100 text-brand-purple-800">
                Jornada Escolar
              </span>
              <h4 className="font-bold text-xs text-slate-900">Visitas Educativas Comunitarias</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                El equipo de Gestión Comunicacional coordina visitas periódicas a escuelas y liceos del estado Barinas para formar a los jóvenes en cultura de prevención.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ----------------------------------------------------------------------
          5. PIE DE PÁGINA INSTITUCIONAL
          ---------------------------------------------------------------------- */}
      <footer className="bg-white border-t border-brand-purple-100 py-6 text-center text-xs text-slate-500">
        <p>© 2026 SIGAC 9-1-1 • Centro de Comando, Control y Telecomunicaciones VEN 9-1-1 Barinas</p>
        <p className="mt-1 text-slate-400 font-medium">Desarrollo de Aplicaciones I • Ingeniería Informática</p>
      </footer>

    </div>
  )
}

