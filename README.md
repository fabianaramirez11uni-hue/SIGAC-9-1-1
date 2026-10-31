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
