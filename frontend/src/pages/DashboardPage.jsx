// ==============================================================================
// SIGAC 9-1-1 - PANEL DE CONTROL INTERNO (DashboardPage.jsx)
// CCCT VEN 9-1-1 Barinas
// ==============================================================================

import React, { useState, useEffect } from 'react'
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  Calendar, 
  Camera, 
  Share2, 
  LogOut, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Bell, 
  Search, 
  Filter, 
  ShieldAlert, 
  ChevronRight, 
  X,
  AlertCircle,
  Home,
  Layers,
  Database
} from 'lucide-react'

export default function DashboardPage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [userList, setUserList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Formulario para registro de funcionarios
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'GESTOR',
    department: 'Gestión Comunicacional y Prensa',
    phone: ''
  })
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [registerError, setRegisterError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/users/')
      if (res.ok) {
        const data = await res.json()
        setUserList(data)
      }
    } catch (e) {
      console.log('Error al cargar lista de usuarios')
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setRegisterError('')
    setRegisterSuccess('')

    try {
      const res = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      })

      const data = await res.json()
      if (res.ok) {
        setRegisterSuccess(`¡Funcionario ${data.user.username} registrado correctamente en la base de datos!`)
        setUserList(prev => [...prev, data.user])
        setRegisterForm({
          username: '',
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          role: 'GESTOR',
          department: 'Gestión Comunicacional y Prensa',
          phone: ''
        })
        setTimeout(() => {
          setIsRegisterModalOpen(false)
          setRegisterSuccess('')
        }, 1500)
      } else {
        const errorMsg = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join(' ')
        setRegisterError(errorMsg || 'No se pudo registrar el funcionario.')
      }
    } catch (err) {
      setRegisterError('Error de comunicación con el backend.')
    }
  }

  const getRoleBadge = (role) => {
    switch(role) {
      case 'ADMIN':
        return 'bg-brand-purple-900 text-white border-brand-purple-700'
      case 'GESTOR':
        return 'bg-brand-pinGreen-500/20 text-brand-pinGreen-600 border-brand-pinGreen-500/40'
      case 'USUARIO':
        return 'bg-brand-purple-100 text-brand-purple-800 border-brand-purple-200'
      case 'VISITANTE':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-300'
    }
  }

  const filteredUsers = userList.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#FBF9FE] text-slate-800 flex flex-col md:flex-row font-sans">
      
      {/* ----------------------------------------------------------------------
          BARRA LATERAL (SIDEBAR)
          ---------------------------------------------------------------------- */}
      <aside className="w-full md:w-64 bg-white border-r border-brand-purple-100 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="p-5 space-y-6">
          
          {/* Logo y Encabezado de la barra */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-sigac.png" 
              alt="SIGAC 9-1-1" 
              className="h-12 w-auto object-contain drop-shadow"
            />
            <div>
              <span className="font-extrabold text-sm text-brand-purple-900 block leading-none">
                SIGAC 9-1-1
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                CCCT Barinas
              </span>
            </div>
          </div>

          {/* Tarjeta del Usuario Conectado */}
          <div className="p-3.5 rounded-2xl bg-brand-purple-50/70 border border-brand-purple-100 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-purple-700 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {user.first_name?.[0] || user.username[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-bold text-slate-900 truncate">
                  {user.first_name} {user.last_name}
                </span>
                <span className="block text-[10px] text-slate-500 truncate font-mono">
                  @{user.username}
                </span>
              </div>
            </div>
            
            <div className="pt-1.5 border-t border-brand-purple-100/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-semibold">Rol Asignado:</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRoleBadge(user.role)}`}>
                {user.role_display || user.role}
              </span>
            </div>
          </div>

          {/* Navegación según el Rol */}
          <nav className="space-y-1 text-xs">
            
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold transition ${activeTab === 'overview' ? 'bg-brand-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-brand-purple-50 hover:text-brand-purple-900'}`}
            >
              <Home className="w-4 h-4" />
              <span>Resumen Principal</span>
            </button>

            {/* Opciones exclusivas del Administrador */}
            {user.role === 'ADMIN' && (
              <>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold transition ${activeTab === 'users' ? 'bg-brand-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-brand-purple-50 hover:text-brand-purple-900'}`}
                >
                  <Users className="w-4 h-4" />
                  <span>Directorio de Personal</span>
                </button>

                <a 
                  href="http://localhost:8000/admin/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-brand-purple-50 hover:text-brand-purple-900 font-semibold transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Database className="w-4 h-4" />
                    <span>Panel Django Admin</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </>
            )}

            {/* Opciones del Gestor */}
            {user.role === 'GESTOR' && (
              <>
                <button 
                  onClick={() => setActiveTab('activities')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold transition ${activeTab === 'activities' ? 'bg-brand-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-brand-purple-50 hover:text-brand-purple-900'}`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Actividades de Prensa</span>
                </button>

                <button 
                  onClick={() => setActiveTab('evidence')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold transition ${activeTab === 'evidence' ? 'bg-brand-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-brand-purple-50 hover:text-brand-purple-900'}`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Evidencias y Archivo</span>
                </button>

                <button 
                  onClick={() => setActiveTab('social')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold transition ${activeTab === 'social' ? 'bg-brand-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-brand-purple-50 hover:text-brand-purple-900'}`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Redes Sociales</span>
                </button>
              </>
            )}

            {/* Opciones del Usuario Operativo */}
            {user.role === 'USUARIO' && (
              <button 
                onClick={() => setActiveTab('tasks')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold transition ${activeTab === 'tasks' ? 'bg-brand-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-brand-purple-50 hover:text-brand-purple-900'}`}
              >
                <FileText className="w-4 h-4" />
                <span>Mis Tareas Asignadas</span>
              </button>
            )}

          </nav>
        </div>

        {/* Botón de Cerrar Sesión en la parte inferior */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-semibold text-xs transition active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ----------------------------------------------------------------------
          CONTENIDO PRINCIPAL DEL DASHBOARD
          ---------------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Barra Superior del Panel */}
        <header className="h-20 bg-white border-b border-brand-purple-100 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              {user.role === 'ADMIN' && 'Panel Administrativo y Control de Usuarios'}
              {user.role === 'GESTOR' && 'Panel de Planificación y Gestión Comunicacional'}
              {user.role === 'USUARIO' && 'Panel Operativo de Asignaciones Institucionales'}
              {user.role === 'VISITANTE' && 'Cartelera Informativa General'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {user.department} • {user.institution}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Contenido según la pestaña y el rol */}
        <main className="flex-1 p-6 sm:p-8 space-y-6">

          {/* ==================================================================
              VISTA 1: ADMINISTRADOR
              ================================================================== */}
          {user.role === 'ADMIN' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Tarjetas Resumen */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-brand-purple-100 shadow-sm space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Personal Registrado</span>
                  <div className="text-2xl font-extrabold text-brand-purple-900">{userList.length}</div>
                  <span className="text-[11px] text-brand-pinGreen-600 font-semibold">Personal activo</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-purple-100 shadow-sm space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Seguridad y Permisos</span>
                  <div className="text-2xl font-extrabold text-brand-purple-900">4 Roles</div>
                  <span className="text-[11px] text-slate-500">Admin, Gestor, Usuario, Visitante</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-purple-100 shadow-sm space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Consola de Base de Datos</span>
                  <div className="text-base font-bold text-brand-purple-900 flex items-center gap-2 pt-1">
                    <Database className="w-4 h-4 text-brand-purple-600" />
                    Django Admin
                  </div>
                  <a 
                    href="http://localhost:8000/admin/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[11px] text-brand-purple-700 hover:underline font-semibold block"
                  >
                    Abrir administrador →
                  </a>
                </div>
              </div>

              {/* Directorio de Personal */}
              <div className="bg-white rounded-2xl border border-brand-purple-100 shadow-sm overflow-hidden space-y-4 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Directorio de Personal y Asignación de Roles
                    </h3>
                    <p className="text-xs text-slate-500">
                      Gestión de cuentas institucionales autorizadas en el sistema
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="Buscar funcionario..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs w-48 sm:w-60 focus:outline-none focus:ring-2 focus:ring-brand-purple-600"
                      />
                    </div>

                    <button 
                      onClick={() => setIsRegisterModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-pinGreen-500 hover:bg-brand-pinGreen-600 text-white font-bold text-xs shadow-sm transition active:scale-95"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Nuevo Funcionario</span>
                    </button>
                  </div>
                </div>

                {/* Tabla de Usuarios */}
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-3">Funcionario</th>
                        <th className="px-5 py-3">Nombre de Usuario</th>
                        <th className="px-5 py-3">Rol del Sistema</th>
                        <th className="px-5 py-3">Departamento</th>
                        <th className="px-5 py-3">Correo Institucional</th>
                        <th className="px-5 py-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-brand-purple-50/20 transition">
                          <td className="px-5 py-3 font-medium text-slate-900">
                            {u.first_name} {u.last_name}
                          </td>
                          <td className="px-5 py-3 font-mono text-slate-600">
                            @{u.username}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadge(u.role)}`}>
                              {u.role_display || u.role}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-slate-600">
                            {u.department}
                          </td>
                          <td className="px-5 py-3 text-slate-500 font-mono">
                            {u.email}
                          </td>
                          <td className="px-5 py-3">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-pinGreen-600 bg-brand-pinGreen-500/10 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Activo
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ==================================================================
              VISTA 2: GESTOR DE PRENSA Y ACTIVIDADES
              ================================================================== */}
          {user.role === 'GESTOR' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-brand-purple-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Cronograma de Actividades y Difusión de Prensa
                  </h2>
                  <p className="text-xs text-slate-500">
                    Planificación de despliegues, archivo de evidencias y control de redes sociales
                  </p>
                </div>

                <button 
                  onClick={() => alert('Módulo de creación conectado con los modelos de Activities en la siguiente fase.')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-pinGreen-500 hover:bg-brand-pinGreen-600 text-white text-xs font-bold shadow-md shadow-brand-pinGreen-500/20 transition active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>+ Planificar Nueva Actividad</span>
                </button>
              </div>

              {/* Tarjetas de Actividades */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-6 rounded-2xl bg-white border border-brand-purple-100 shadow-sm hover:border-brand-purple-300 transition space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-pinGreen-500/15 text-brand-pinGreen-600">
                      En Proceso
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 09:00 AM
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Despliegue de Prevención y Seguridad Vial
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Operativo conjunto con Tránsito Terrestre y OSC en puntos de control de Barinas.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">8 Fotos • 2 Videos</span>
                    <button className="text-brand-purple-700 font-semibold hover:underline flex items-center gap-1">
                      Ver Evidencias <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-brand-purple-100 shadow-sm hover:border-brand-purple-300 transition space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-purple-100 text-brand-purple-800">
                      Planificada
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Mañana
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Taller: Uso Responsable de la Línea 9-1-1
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Jornada de concientización escolar con estudiantes del Liceo O'Leary.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Minuta Técnica</span>
                    <button className="text-brand-purple-700 font-semibold hover:underline flex items-center gap-1">
                      Redactar <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-brand-purple-100 shadow-sm hover:border-brand-purple-300 transition space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-alertRed-100 text-brand-alertRed-600">
                      Pendiente en Redes
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Redes Oficiales
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Campaña Informativa Institucional
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Artes y copys para Instagram y X sobre canales de atención ciudadana.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Instagram, X, FB</span>
                    <button className="text-brand-purple-700 font-semibold hover:underline flex items-center gap-1">
                      Gestionar <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================================================================
              VISTA 3: USUARIO OPERATIVO
              ================================================================== */}
          {user.role === 'USUARIO' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="pb-2 border-b border-brand-purple-100">
                <h2 className="text-lg font-bold text-slate-900">
                  Actividades Asignadas a tu Usuario
                </h2>
                <p className="text-xs text-slate-500">
                  Consulta de tareas de campo y cobertura asignadas por la coordinación
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-brand-purple-100 shadow-sm p-6 space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">
                      Cobertura Fotográfica: Jornada Comunitaria Alto Barinas
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tomar registro audiovisual del inicio de la jornada y entrega de folletos informativos.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-pinGreen-500/15 text-brand-pinGreen-600">
                    Asignado
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">
                      Soporte Técnico de Radioenlaces: Despliegue Barinas
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Verificación de equipos de telecomunicaciones antes del inicio del despliegue.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-purple-100 text-brand-purple-800">
                    En Espera
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================================
              VISTA 4: VISITANTE
              ================================================================== */}
          {user.role === 'VISITANTE' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-sm">
                    Acceso Restringido a Información Interna
                  </h3>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  El rol de <strong>Visitante</strong> solo tiene autorización para visualizar anuncios generales. Para consultar datos del personal, minutas de actividades o subir evidencias, debe iniciar sesión con una cuenta autorizada de Gestor o Administrador.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ----------------------------------------------------------------------
          MODAL DE REGISTRO DE FUNCIONARIO (Solo para Administrador)
          ---------------------------------------------------------------------- */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-purple-950/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-brand-purple-100 relative space-y-5">
            
            <button 
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Registrar Funcionario en el Sistema
              </h3>
              <p className="text-xs text-slate-500">
                Creación controlada de credenciales institucionales
              </p>
            </div>

            {registerError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

            {registerSuccess && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{registerSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ej. María"
                    value={registerForm.first_name}
                    onChange={(e) => setRegisterForm({ ...registerForm, first_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Apellido</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ej. Gómez"
                    value={registerForm.last_name}
                    onChange={(e) => setRegisterForm({ ...registerForm, last_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Usuario</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ej. mgomez"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Contraseña (Mín. 8)</label>
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Rol Institucional</label>
                  <select 
                    value={registerForm.role}
                    onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-brand-purple-500 focus:outline-none font-medium"
                  >
                    <option value="GESTOR">Gestor de Actividades</option>
                    <option value="USUARIO">Usuario Operativo</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="VISITANTE">Visitante Informativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="mgomez@gmail.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Departamento / Área</label>
                <input 
                  type="text" 
                  value={registerForm.department}
                  onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-pinGreen-500 hover:bg-brand-pinGreen-600 text-white text-xs font-bold shadow-md shadow-brand-pinGreen-500/20 transition"
                >
                  Registrar Funcionario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

