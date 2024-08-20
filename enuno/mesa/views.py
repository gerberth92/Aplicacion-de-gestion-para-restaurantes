from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Mesa
from .serializers import MesaSerializer


class MesaList(APIView):
    def get(self, request):
        mesas = Mesa.objects.all()
        serializer = MesaSerializer(mesas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MesaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MesaDetail(APIView):
    def get(self, request, pk):
        try:
            mesa = Mesa.objects.get(pk=pk)
        except Mesa.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MesaSerializer(mesa)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            mesa = Mesa.objects.get(pk=pk)
        except Mesa.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MesaSerializer(mesa, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            mesa = Mesa.objects.get(pk=pk)
        except Mesa.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        mesa.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)