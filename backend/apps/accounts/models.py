"""
==============================================================================
SIGAC 9-1-1 - MODELO DE USUARIOS Y ROLES (apps/accounts/models.py)
CCCT VEN 9-1-1 Barinas
Requerimiento Académico B.6 y B.8
==============================================================================
Propósito:
Extiende el modelo de usuario estándar de Django (AbstractUser) para incorporar
los 4 roles del sistema institucional:
  1. Administrador (ADMIN): Acceso total, gestión de usuarios, roles y auditoría.
  2. Gestor (GESTOR): Crea, edita, programa actividades, sube evidencias y publicaciones.
  3. Usuario (USUARIO): Funcionario operativo que consulta y ejecuta tareas asignadas.
  4. Visitante (VISITANTE): Acceso público/restringido solo a carteleras informativas.
==============================================================================
"""

from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    """
    Modelo de usuario personalizado para el personal del CCCT VEN 9-1-1 Barinas.
    Hereda la seguridad criptográfica de Django (PBKDF2) y agrega roles institucionales.
    """
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrador'
        GESTOR = 'GESTOR', 'Gestor de Actividades'
        USUARIO = 'USUARIO', 'Usuario Operativo'
        VISITANTE = 'VISITANTE', 'Visitante Informativo'

    # Rol del usuario en el sistema SIGAC
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.USUARIO,
        verbose_name='Rol Institucional',
        help_text='Define los privilegios de acceso y visibilidad en el sistema'
    )

    # Datos adicionales del funcionario institucional
    institution = models.CharField(
        max_length=150,
        default='CCCT VEN 9-1-1 Barinas',
        verbose_name='Institución / Organismo'
    )
    
    department = models.CharField(
        max_length=100,
        default='Gestión Comunicacional y Prensa',
        verbose_name='Departamento / Área'
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name='Teléfono de Contacto'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Registro'
    )

    class Meta:
        verbose_name = 'Usuario del Sistema'
        verbose_name_plural = 'Usuarios del Sistema'
        ordering = ['-date_joined']

    def __str__(self):
        full_name = self.get_full_name()
        return f"{self.username} ({self.get_role_display()})" if not full_name else f"{full_name} ({self.get_role_display()})"

    # Métodos utilitarios de verificación de rol para vistas y permisos (B.8)
    @property
    def is_admin_role(self):
        return self.role == self.Role.ADMIN or self.is_superuser

    @property
    def is_gestor_role(self):
        return self.role in [self.Role.ADMIN, self.Role.GESTOR] or self.is_superuser

    @property
    def is_standard_user_role(self):
        return self.role in [self.Role.ADMIN, self.Role.GESTOR, self.Role.USUARIO] or self.is_superuser

    @property
    def is_visitante_role(self):
        return self.role == self.Role.VISITANTE

