from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Ordenes
from .serializers import OrdenesSerializer


class OrdenesList(APIView):
    def get(self, request):
        ordenes = Ordenes.objects.all()
        serializer = OrdenesSerializer(ordenes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrdenesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrdenesDetail(APIView):
    def get(self, request, pk):
        try:
            orden = Ordenes.objects.get(pk=pk)
        except Ordenes.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = OrdenesSerializer(orden)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            orden = Ordenes.objects.get(pk=pk)
        except Ordenes.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = OrdenesSerializer(orden, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            orden = Ordenes.objects.get(pk=pk)
        except Ordenes.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        orden.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
