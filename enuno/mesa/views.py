from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Mesa
from .serializers import MesaSerializer


class MesaList(APIView):
    def get(self, request):
        id_rest = request.query_params.get('id_rest')

        if not id_rest:
            return Response({'error': 'El ID del restaurante es requerido.'}, status=status.HTTP_400_BAD_REQUEST)
        
        mesas = Mesa.objects.filter(id_restaurante_id=id_rest)
        serializer = MesaSerializer(mesas, many=True)
        return Response(serializer.data)

    def post(self, request):
        cantidad_mesas = request.data.get('cantidad')
        id_rest = request.data.get('id_restaurante')

        if cantidad_mesas is None:
            return Response({'error': 'La cantidad de mesas es requerida.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if id_rest is None:
            return Response({'error': 'El id_restaurante es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

        mesas = Mesa.objects.filter(id_restaurante=id_rest)
        total = mesas.count()

        try:
            cantidad_mesas = int(cantidad_mesas)
        except ValueError:
            return Response({'error': 'La cantidad debe ser un número entero válido.'}, status=status.HTTP_400_BAD_REQUEST)

        if total < cantidad_mesas:
            # Crear registros en la tabla Mesa
            for _ in range(cantidad_mesas - total):
                nueva_mesa = Mesa(estado_enum_ocupada_disponible_field='disponible', id_restaurante_id=id_rest)
                nueva_mesa.save()
            return Response({'message': f'Se crearon {cantidad_mesas} mesas.'}, status=status.HTTP_201_CREATED)
        elif total > cantidad_mesas:
            eliminar = mesas.order_by('-id_mesa')[:total - cantidad_mesas]
            # Eliminar registros en la tabla Mesa
            for mesa in eliminar:
                mesa.delete()
            return Response({'message': f'Se eliminaron {total - cantidad_mesas} mesas.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'La cantidad de mesas es igual al número enviado desde el front-end.'}, status=status.HTTP_200_OK)

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
    
    def patch(self, request, pk):
        try:
            mesa = Mesa.objects.get(pk=pk)
        except Mesa.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = MesaSerializer(mesa, data=request.data, partial=True)
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
