from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Usuarios
from .serializers import UsuariosSerializer


class UsuariosList(APIView):
    def get(self, request):
        id_rest = request.query_params.get('id_rest')

        if not id_rest:
            return Response({'error': 'El ID del restaurante es requerido.'}, status=status.HTTP_400_BAD_REQUEST)
        
        usuarios = Usuarios.objects.filter(id_restaurante_id=id_rest)
        serializer = UsuariosSerializer(usuarios, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UsuariosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuariosDetail(APIView):
    def get(self, request, pk):
        try:
            usuario = Usuarios.objects.get(pk=pk)
        except Usuarios.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UsuariosSerializer(usuario)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            usuario = Usuarios.objects.get(pk=pk)
        except Usuarios.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UsuariosSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            usuario = Usuarios.objects.get(pk=pk)
        except Usuarios.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
