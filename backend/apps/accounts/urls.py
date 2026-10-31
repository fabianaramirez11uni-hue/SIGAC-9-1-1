"""
==============================================================================
SIGAC 9-1-1 - RUTAS DE AUTENTICACIÓN Y USUARIOS (apps/accounts/urls.py)
==============================================================================
"""

from django.urls import path
from .views import LoginView, LogoutView, CurrentUserView, ControlledRegisterView, UserListView

urlpatterns = [
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('me/', CurrentUserView.as_view(), name='auth_current_user'),
    path('register/', ControlledRegisterView.as_view(), name='auth_register'),
    path('users/', UserListView.as_view(), name='user_list'),
]

