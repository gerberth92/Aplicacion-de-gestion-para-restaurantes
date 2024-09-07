from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Ordenes
from pedidos.models import Pedidos
from .serializers import OrdenesSerializer


class OrdenesList(APIView):
    def get(self, request):
        id_rest = request.query_params.get('id_rest')
        modulo = request.query_params.get('modulo')

        print(f"id_rest: {id_rest}, modulo: {modulo}")

        id_pedido = request.query_params.get('id_pedido')
        id_mesa = request.query_params.get('id_mesa')

        if (id_rest):
            if (modulo == 'cocina'):
                pedidos = Pedidos.objects.filter(id_restaurante=id_rest).values_list('id', flat=True)
                ordenes = Ordenes.objects.filter(id_pedido__in=pedidos, alimento__isnull=False)
                serializer = OrdenesSerializer(ordenes, many=True)
                return Response(serializer.data)
            
            elif (modulo == 'bar'):
                pedidos = Pedidos.objects.filter(id_restaurante=id_rest).values_list('id', flat=True)
                ordenes = Ordenes.objects.filter(id_pedido__in=pedidos, bebida__isnull=False)
                serializer = OrdenesSerializer(ordenes, many=True)
                return Response(serializer.data)
            
            else:
                return Response({'error': 'Módulo no válido.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if not id_pedido:
                return Response({'error': 'El ID del pedido es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

            if not id_mesa:
                return Response({'error': 'El ID de la mesa es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

            ordenes = Ordenes.objects.filter(id_pedido=id_pedido, id_pedido__id_mesa=id_mesa)
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
    
    def patch(self, request, pk):
        try:
            orden = Ordenes.objects.get(pk=pk)
        except Ordenes.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = OrdenesSerializer(orden, data=request.data, partial=True)
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
