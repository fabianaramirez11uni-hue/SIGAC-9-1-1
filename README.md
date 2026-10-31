# SIGAC 9-1-1
### Sistema de Gestión y Seguimiento de Actividades Comunicacionales
**Centro de Comando, Control y Telecomunicaciones CCCT VEN 9-1-1 Barinas**  
*Asignatura: Desarrollo de Aplicaciones I — 7mo Semestre de Ingeniería Informática*  
*Autora: Fabiana Ramírez*

---

## 📌 Introducción y Justificación del Proyecto

### ¿De qué se trata el sistema?
**SIGAC 9-1-1** es una aplicación web integral desarrollada para centralizar la planificación, organización, registro fotográfico/audiovisual y seguimiento de las actividades comunicacionales ejecutadas por el área de Gestión Comunicacional / Prensa del **CCCT VEN 9-1-1 Barinas**, así como aquellas coordinadas conjuntamente con los Órganos de Seguridad Ciudadana (OSC), cuerpos de bomberos, tránsito terrestre y comunidades organizadas.

La plataforma permite gestionar el ciclo de vida completo de cada evento institucional (despliegues de seguridad, talleres de concientización escolar, efemérides patrias, jornadas comunitarias y coberturas mediáticas), asociando minutas, evidencias audiovisuales y monitoreando el estado de difusión en las redes sociales oficiales.

### Origen y motivación: ¿Por qué se escogió este proyecto?
El proyecto surge de una necesidad institucional palpable dentro del CCCT VEN 9-1-1 Barinas. Los procesos de registro de actividades y archivo de material periodístico se realizaban previamente mediante métodos dispersos (mensajería instantánea, carpetas locales y reportes físicos), lo que ocasionaba:
- Falta de un repositorio unificado de evidencias fotográficas de alta calidad para notas de prensa.
- Dificultad para auditar el cumplimiento y cronograma de despliegues preventivos.
- Ausencia de control sobre el estado de difusión de campañas institucionales en redes sociales.

Como estudiante de Ingeniería Informática, se seleccionó este desarrollo para proporcionar una solución de software escalable, modular, segura y basada en contenedores (Docker), aplicando buenas prácticas de ingeniería de software para fortalecer la labor de servicio público que el VEN 9-1-1 brinda al pueblo barinés.

---

## 🏛️ Metodología de Desarrollo de Software

### A.1. Rama Descendente (Fase de Verificación) – Metodología de Desarrollo en V
**Proyecto:** SIGAC 9-1-1 – Sistema de Gestión y Seguimiento de Actividades Comunicacionales del CCCT VEN 9-1-1 Barinas.

La rama descendente de la metodología de desarrollo en V comprende las etapas de análisis y diseño del software, en las cuales se establecen las necesidades, características, estructura y componentes que conformarán la aplicación. Para el desarrollo de SIGAC 9-1-1, se contemplan las siguientes fases:

#### 1. Análisis de Requisitos (Requirement Gathering)
En esta etapa se identifican las necesidades del área de Gestión Comunicacional / Prensa del CCCT VEN 9-1-1 Barinas, con la finalidad de desarrollar una aplicación web que permita centralizar la planificación, organización, registro y seguimiento de las actividades comunicacionales.

Se establecen como principales funcionalidades el registro e inicio de sesión de usuarios, la administración de roles y permisos, el registro y consulta de actividades, la incorporación de evidencias fotográficas y audiovisuales, la gestión de informes y el seguimiento del estado de las publicaciones en redes sociales. También se consideran requisitos de seguridad, disponibilidad y organización de la información institucional.

#### 2. Análisis del Sistema (System Analysis)
Se define el funcionamiento general de SIGAC 9-1-1 como una aplicación web de uso interno, destinada a facilitar la gestión de las actividades comunicacionales de la institución mediante una plataforma centralizada.

El sistema permitirá registrar actividades propias del equipo de Gestión Comunicacional y aquellas coordinadas con otras instituciones, contemplando información como fechas, lugares, organismos participantes, temas y responsables. Asimismo, permitirá asociar evidencias e informes y realizar seguimiento a las publicaciones correspondientes.

Se establece una estructura funcional organizada en módulos y un sistema de acceso basado en cuatro roles, cada uno con responsabilidades y permisos específicos:
- **Administrador:** Tendrá el control general del sistema. Podrá gestionar las cuentas de usuarios, asignar roles y permisos, administrar los registros y supervisar el funcionamiento general de la aplicación.
- **Gestor:** Será responsable de coordinar y supervisar la gestión de las actividades comunicacionales. Podrá registrar, consultar, modificar y organizar actividades, asignar responsables, revisar las evidencias e informes y realizar seguimiento a las publicaciones.
- **Usuario Articulador:** Será el encargado de registrar y actualizar la información de las actividades en las que participe, incorporar evidencias fotográficas y audiovisuales, elaborar o adjuntar informes y consultar el estado de las actividades según los permisos asignados.
- **Visitante:** Tendrá acceso limitado a la información que se autorice para su consulta, sin posibilidad de modificar registros ni acceder a información institucional privada. Al tratarse de una aplicación de uso interno, su acceso estará restringido a las vistas informativas que se habiliten para este rol.

De esta manera, el sistema permitirá distribuir las responsabilidades y controlar el acceso a la información de acuerdo con las funciones de cada integrante del área.

#### 3. Diseño de Software / Arquitectura (Software Design)
En esta fase se define la arquitectura tecnológica de la aplicación, los componentes principales y la forma en que se relacionarán para garantizar el funcionamiento del sistema.

La solución estará organizada bajo una arquitectura cliente-servidor desacoplada, utilizando las siguientes tecnologías:
- **Backend:** Python y Django (con Django REST Framework), encargados de la lógica de negocio, procesamiento de información, autenticación mediante sesiones cifradas y control de permisos por rol.
- **Frontend:** Vite.js y React con Tailwind CSS, utilizado como herramienta de desarrollo y compilación para la construcción y gestión de la interfaz web reactiva, moderna y adaptable.
- **Base de datos:** PostgreSQL 16, destinada al almacenamiento estructurado e íntegro de usuarios, actividades, evidencias, informes y publicaciones.
- **Entorno de desarrollo:** Docker y Docker Compose, empleados para configurar y ejecutar los tres componentes del sistema de forma aislada y reproducible mediante contenedores.
- **Control de versiones:** Git y GitHub, utilizados para gestionar y mantener el historial de cambios del código fuente.

La arquitectura permitirá mantener separados los componentes del sistema, facilitando su organización, mantenimiento y futuras ampliaciones.

#### 4. Diseño de Módulos (Module Design)
En esta etapa se establece la estructura interna de las aplicaciones o módulos que conformarán SIGAC 9-1-1, definiendo sus responsabilidades, operaciones, modelos de datos y relaciones:
- **Autenticación y Usuarios (`apps.accounts`):** Permite gestionar las cuentas institucionales, el inicio y cierre de sesión, así como la asignación de roles y permisos.
- **Gestión de Actividades (`apps.activities`):** Permite registrar, consultar, modificar y organizar las actividades comunicacionales, incluyendo sus fechas, ubicaciones, organismos organizadores, temas y responsables.
- **Evidencias e Informes (`apps.evidence`):** Permite incorporar y consultar fotografías, videos y minutas técnicas relacionadas con las actividades registradas.
- **Seguimiento de Publicaciones (`apps.publications`):** Permite registrar las publicaciones asociadas a cada actividad y controlar su estado (pendiente, en preparación, publicado, cancelado).
- **Administración:** Permite gestionar los registros y modelos de datos mediante el panel administrativo de Django Admin.
- **Panel Principal y Vistas:** Organiza las opciones de navegación y presentación de información de acuerdo con los roles y permisos de cada usuario.

#### 5. Punto de Inflexión
Representa el punto de transición entre las etapas de análisis y diseño y la fase de construcción del software. En SIGAC 9-1-1, se alcanzó una vez definidos los requisitos funcionales y no funcionales, la arquitectura tecnológica, la estructura de los módulos y los modelos de datos.

A partir de este punto, se contó con las especificaciones necesarias para iniciar la implementación de la aplicación y desarrollar progresivamente sus funcionalidades.

#### 6. Codificación (Coding)
En esta etapa se llevó a cabo la construcción del código fuente de SIGAC 9-1-1, tomando como referencia los requisitos y diseños establecidos en las fases anteriores.

Se configuró el entorno de desarrollo mediante Docker Compose, se implementó el backend modular utilizando Django 5.1 y Django REST Framework, se desarrolló la interfaz web con Vite.js y React, y se estableció la conexión con PostgreSQL 16. Se implementaron los modelos, migraciones, autenticación, roles, permisos en backend, panel administrativo de Django Admin y vistas principales por rol con navegación independiente.

Asimismo, se utilizó Git y GitHub para el control de versiones y el seguimiento de los cambios realizados durante el desarrollo. El resultado de esta etapa es la primera versión funcional del sistema, cuyas funcionalidades serán verificadas mediante las pruebas correspondientes de la rama ascendente de la metodología en V.

---

## 🗂️ Estructura del Proyecto

El repositorio sigue el principio de separación de responsabilidades (*Separation of Concerns - SoC*), aislando la lógica de negocio y API de la interfaz de usuario:

```text
SIGAC_9-1-1/
├── .dockerignore                 # Exclusión de archivos innecesarios para el build de Docker
├── .env.example                  # Plantilla de variables de entorno segura para desarrollo
├── .gitignore                    # Reglas de exclusión de Git (oculta .env, node_modules, media)
├── README.md                     # Documentación técnica y académica completa del proyecto
├── docker-compose.yml            # Orquestador multi-contenedor (db, backend, frontend)
│
├── backend/                      # API REST y Gestión de Datos (Python 3.12 / Django 5.1)
│   ├── Dockerfile                # Imagen Debian slim con dependencias para PostgreSQL y Pillow
│   ├── requirements.txt          # Django, DRF, django-cors-headers, psycopg2-binary, Pillow
│   ├── manage.py                 # Utilidad de administración de Django
│   ├── config/                   # Configuración global del proyecto
│   │   ├── settings.py           # Configuración de base de datos, CORS, JWT/Sesión y apps
│   │   ├── urls.py               # Enrutador principal de la API y Django Admin
│   │   ├── wsgi.py / asgi.py     # Puntos de entrada para despliegue de servidor
│   └── apps/                     # Módulos de negocio independientes
│       └── accounts/             # Modelo CustomUser, serializadores, vistas y Django Admin
│
└── frontend/                     # Interfaz de Usuario Reactiva (Vite.js + React 18)
    ├── Dockerfile                # Imagen Node.js 20 LTS Alpine para desarrollo
    ├── package.json              # Dependencias de React, Lucide Icons y Tailwind CSS
    ├── vite.config.js            # Configuración de Vite con HMR y sondeo de archivos
    ├── tailwind.config.js        # Sistema de diseño con la paleta de colores institucional
    ├── index.html                # Documento HTML principal y favicon institucional
    ├── public/
    │   └── logo-sigac.png        # Emblema oficial transparente del CCCT VEN 9-1-1 Barinas
    └── src/
        ├── pages/
        │   ├── HomePage.jsx      # Portal institucional público para la ciudadanía
        │   ├── LoginPage.jsx     # Pantalla independiente de autenticación segura
        │   └── DashboardPage.jsx # Panel interno con vistas y permisos adaptados por rol
        ├── App.jsx               # Enrutador de vistas con control de estado de sesión
        ├── main.jsx              # Punto de entrada de React 18
        └── index.css             # Estilos globales y directivas de Tailwind CSS
```

---

## 🔒 Buenas Prácticas de Seguridad Implementadas

1. **Gestión Segura de Credenciales:** Las variables sensibles (clave secreta de Django, contraseñas de la base de datos) se gestionan mediante variables de entorno (`.env`) excluidas estrictamente del control de versiones.
2. **Cifrado Robusto de Contraseñas:** No se almacenan contraseñas en texto plano; se utiliza el algoritmo estándar de hashing criptográfico `PBKDF2SHA256` con salt aleatorio de Django.
3. **Control de Acceso Basado en Roles (RBAC):** La seguridad y los privilegios se validan en el backend a nivel de API y en el panel administrativo, no únicamente ocultando botones en la interfaz visual.
4. **Protección CORS:** Se restringe la comunicación de origen cruzado exclusivamente a los dominios autorizados de desarrollo (`localhost:5173`).
5. **Almacenamiento de Evidencias:** Las imágenes y archivos multimedia no se guardan como binarios pesados en la base de datos, sino en el sistema de archivos del servidor montado en volúmenes Docker persistentes.

---

## 📈 Historial de Hitos y Commits Relevantes

El desarrollo del sistema se registró de forma incremental siguiendo la convención de commits semánticos (*Conventional Commits*):

| Hito / Commit | Descripción del Aporte Técnico al Proyecto |
| :--- | :--- |
| `feat: inicializacion del stack` | Diagnóstico del entorno y configuración de Docker Compose con PostgreSQL 16, Django 5.1 y Vite.js. |
| `style: identidad visual institucional` | Integración del emblema oficial del CCCT VEN 9-1-1 Barinas con transparencia y paleta de colores morados, pasteles y verde lima. |
| `feat: modelo customuser y autenticacion` | Creación de la aplicación `accounts`, modelo `CustomUser` con roles, serializadores y endpoints de login/logout/registro controlado. |
| `feat: configuracion de django admin` | Registro del modelo de usuarios en el panel administrativo con filtros por departamento y opciones de búsqueda. |
| `feat: arquitectura multivista y permisos` | Separación de la aplicación en Portal Público (`HomePage`), Login Independiente (`LoginPage`) y Panel Interno (`DashboardPage`). |
| `docs: documentacion metodologica en V` | Redacción de la rama descendente de la metodología en V, credenciales de prueba y simplificación de la guía de clonación. |

---

## 🔑 Credenciales para Evaluación de Roles del Sistema

Para evaluar de forma independiente el inicio de sesión y la adaptación del panel interno según los privilegios del usuario, se encuentran configuradas las siguientes cuentas en el sistema:

| Rol Evaluado | Usuario | Contraseña | Correo Electrónico | Funcionalidades Habilitadas en el Panel |
| :--- | :--- | :--- | :--- | :--- |
| **1. Administrador** | `admin` | `admin1234` | `admin.sigac911@gmail.com` | Gestión de personal, creación controlada de funcionarios, asignación de roles y acceso a Django Admin. |
| **2. Gestor de Prensa** | `gestor_prensa` | `gestor1234` | `prensa.ven911@gmail.com` | Planificación de actividades, gestión de evidencias (fotos/videos) y monitoreo de redes sociales. |
| **3. Usuario Articulador** | `articulador_social` | `articulador1234` | `articulador911@gmail.com` | Registro y actualización de actividades asignadas y elaboración de minutas. |
| **4. Visitante** | `visitante_inst` | `visitante1234` | `visitante911.barinas@gmail.com` | Cartelera informativa pública. Restricción estricta de seguridad ante datos privados. |

> **Nota:** El panel administrativo de Django también se encuentra disponible en: **`http://localhost:8000/admin/`** con las credenciales del usuario `admin`.

---

## 🚀 Guía de Clonación del Repositorio

Para clonar y disponer del código fuente del proyecto en su equipo local:

### 1. Clonar el repositorio
Abra su terminal (PowerShell, Git Bash o CMD) y ejecute el siguiente comando:
```bash
git clone https://github.com/fabianaramirez11uni-hue/SIGAC-9-1-1.git
```

### 2. Ingresar a la carpeta del proyecto
```bash
cd SIGAC-9-1-1
```

---

## 🌐 Enlaces del Sistema

- 💻 **Frontend Web (Vite + React):** [http://localhost:5173](http://localhost:5173)
- ⚙️ **Backend API (Django REST Framework):** [http://localhost:8000/api/health/](http://localhost:8000/api/health/)
- 🛡️ **Panel Administrativo (Django Admin):** [http://localhost:8000/admin/](http://localhost:8000/admin/)

---

## 🎯 Conclusión

El desarrollo del proyecto **SIGAC 9-1-1** tiene como objetivo primordial dotar al **CCCT VEN 9-1-1 Barinas** de una plataforma tecnológica centralizada, confiable y segura que optimice la planificación, organización, archivo de evidencias audiovisuales y seguimiento de las actividades comunicacionales e institucionales, sustituyendo procedimientos manuales y dispersos por un flujo de trabajo digitalizado, eficiente y auditable.

Por su parte, la adopción de la **Metodología de Desarrollo en V** (específicamente su rama descendente de análisis y diseño) tiene como propósito garantizar un proceso de ingeniería de software riguroso, ordenado y con alta trazabilidad. Este enfoque metodológico asegura que cada necesidad institucional identificada se traduzca de forma sistemática en especificaciones técnicas, diseño arquitectónico y componentes modulares, permitiendo que cada etapa de construcción cuente con criterios claros de verificación y sentando bases sólidas para las futuras pruebas de aseguramiento de calidad del sistema.

---

## 📄 Licencia y Uso Académico
Proyecto académico desarrollado para la asignatura **Desarrollo de Aplicaciones I**, Carrera de Ingeniería Informática. Uso institucional interno para el **Centro de Comando, Control y Telecomunicaciones CCCT VEN 9-1-1 Barinas**.
