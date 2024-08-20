from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cargos
from .serializers import CargosSerializer


class CargosList(APIView):
    def get(self, request):
        cargos = Cargos.objects.all()
        serializer = CargosSerializer(cargos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CargosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CargosDetail(APIView):
    def get(self, request, pk):
        try:
            cargo = Cargos.objects.get(pk=pk)
        except Cargos.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CargosSerializer(cargo)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            cargo = Cargos.objects.get(pk=pk)
        except Cargos.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CargosSerializer(cargo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            cargo = Cargos.objects.get(pk=pk)
        except Cargos.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        cargo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
