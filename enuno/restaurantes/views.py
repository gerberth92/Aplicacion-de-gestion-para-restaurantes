from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Corp
from .serializers import CorpSerializer


class RestList(APIView):
    def get(self, request):
        rests = Corp.objects.all()
        serializer = CorpSerializer(rests, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("Datos recibidos en el POST:", request.data)
        serializer = CorpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RestDetail(APIView):
    def get(self, request, pk):
        try:
            rest = Corp.objects.get(pk=pk)
        except Corp.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CorpSerializer(rest)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            rest = Corp.objects.get(pk=pk)
        except Corp.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CorpSerializer(rest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            rest = Corp.objects.get(pk=pk)
        except Corp.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        rest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
