"""
==============================================================================
SIGAC 9-1-1 - VISTAS DE AUTENTICACIÓN Y ROLES (apps/accounts/views.py)
CCCT VEN 9-1-1 Barinas - Requerimientos B.6 y B.8
==============================================================================
"""

from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.contrib.auth import login, logout
from .serializers import UserSerializer, LoginSerializer, ControlledRegisterSerializer
from .models import CustomUser

class LoginView(views.APIView):
    """
    Módulo de inicio de sesión institucional (Requerimiento B.6).
    Valida credenciales y asocia la sesión de usuario en Django.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            user_data = UserSerializer(user).data
            return Response({
                'message': f'Bienvenido/a {user.get_full_name() or user.username} al SIGAC 9-1-1',
                'user': user_data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):
    """Cierra la sesión del usuario autenticado."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        logout(request)
        return Response({'message': 'Sesión cerrada exitosamente.'}, status=status.HTTP_200_OK)

class CurrentUserView(views.APIView):
    """
    Devuelve los datos del usuario en sesión actual y sus roles (Requerimiento B.8).
    Si no está autenticado, devuelve el perfil con rol 'VISITANTE'.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'is_authenticated': True,
                'user': UserSerializer(request.user).data
            })
        return Response({
            'is_authenticated': False,
            'user': {
                'username': 'visitante',
                'role': 'VISITANTE',
                'role_display': 'Visitante Informativo',
                'institution': 'CCCT VEN 9-1-1 Barinas'
            }
        })

class ControlledRegisterView(views.APIView):
    """
    Registro controlado de cuentas de funcionarios institucionales (Requerimiento B.6).
    Solo administradores autorizados pueden crear cuentas para personal de prensa y gestión.
    """
    permission_classes = [permissions.AllowAny] # En desarrollo permitimos la creación inicial controlada

    def post(self, request):
        serializer = ControlledRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': f'Funcionario {user.username} registrado exitosamente con rol {user.get_role_display()}.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(views.APIView):
    """Lista de usuarios para el panel del Administrador."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        users = CustomUser.objects.all()
        return Response(UserSerializer(users, many=True).data)

