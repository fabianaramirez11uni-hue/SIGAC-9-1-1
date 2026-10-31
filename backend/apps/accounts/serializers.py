"""
==============================================================================
SIGAC 9-1-1 - SERIALIZADORES DE USUARIO Y AUTENTICACIÓN
apps/accounts/serializers.py - Requerimiento B.6
==============================================================================
"""

from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    """Serializador para mostrar los datos del usuario conectado y sus roles."""
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'id', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'role', 
            'role_display',
            'institution', 
            'department', 
            'phone', 
            'is_staff', 
            'is_active',
            'date_joined'
        )
        read_only_fields = ('id', 'date_joined')

class LoginSerializer(serializers.Serializer):
    """Valida credenciales de acceso para el inicio de sesión."""
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError('Credenciales incorrectas. Verifique su usuario y contraseña.')
        if not user.is_active:
            raise serializers.ValidationError('Esta cuenta institucional se encuentra inactiva. Contacte al Administrador.')

        data['user'] = user
        return data

class ControlledRegisterSerializer(serializers.ModelSerializer):
    """
    Registro controlado de nuevos funcionarios (Requerimiento B.6).
    Como es un sistema institucional, solo los administradores o procesos
    controlados pueden dar de alta cuentas.
    """
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = (
            'username', 
            'email', 
            'password', 
            'first_name', 
            'last_name', 
            'role', 
            'department', 
            'phone'
        )

    def create(self, validated_data):
        # Crear usuario utilizando el método seguro de Django que encripta la contraseña
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', CustomUser.Role.USUARIO),
            department=validated_data.get('department', 'Gestión Comunicacional y Prensa'),
            phone=validated_data.get('phone', '')
        )
        return user

