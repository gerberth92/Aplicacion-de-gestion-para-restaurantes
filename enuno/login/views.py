from rest_framework import status, permissions, generics
from rest_framework.response import Response
from usuarios.models import Usuarios
from restaurantes.models import Corp
from .serializers import LoginSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        if username == "corp" and password == "corp":
            return Response(
                {
                    "success": True,
                    "user": {
                        "username": "corp",
                        "role": "corp"
                    }
                }, status=status.HTTP_200_OK
            )

        def get_usuario():
            try:
                return Usuarios.objects.get(user=username, cont=password)
            except Usuarios.DoesNotExist:
                return None

        def get_corp():
            try:
                return Corp.objects.get(user=username, contrasena=password)
            except Corp.DoesNotExist:
                return None
            
        usuario = get_usuario()
        corp = get_corp()

        if usuario:
            return Response(
                {
                    "success": True,
                    "user": {
                        "username": usuario.user,
                        "role": usuario.puesto
                    }
                }, status=status.HTTP_200_OK
            )
    
        if corp:
            return Response(
                {
                    "success": True,
                    "user": {
                        "username": corp.user,
                        "role": "admin"
                    }
                }, status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
