from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import LoginSerializer


# Vistas para el modelo Corp
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if username == 'admin' and password == 'admin':
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "success": True,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": {
                        "username": "admin",
                        "role": "corp"
                    }
                }
            )
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "success": True,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": {
                        "username": "admin",
                        "role": "corp"
                    }
                }
            )
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
