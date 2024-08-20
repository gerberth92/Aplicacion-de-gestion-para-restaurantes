from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Bebidas
from .serializers import BebidasSerializer
import json


@csrf_exempt
@require_http_methods(["GET", "POST"])
def list_bebidas(request):
    """
    Maneja las solicitudes HTTP para la lista de bebidas.

    Esta vista admite solicitudes GET para obtener una lista de todas las bebidas y solicitudes POST para crear 
    una nueva bebida.

    - GET: Obtiene una lista de todas las bebidas y devuelve los datos en formato JSON.
    - POST: Crea una nueva bebida con los datos proporcionados en el cuerpo de la solicitud y devuelve los datos 
      de la bebida recién creada en formato JSON.

    Respuestas:
        - 200 OK: Si la solicitud GET es exitosa, devuelve una lista de bebidas en formato JSON.
        - 201 Created: Si la solicitud POST es exitosa, devuelve los datos de la bebida creada en formato JSON.
        - 400 Bad Request: Si los datos proporcionados en la solicitud POST no son válidos o si hay un error en 
          el JSON enviado.
    """
    if request.method == "GET":
        queryset = Bebidas.objects.all()
        serializer = BebidasSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud JSON inválida'}, status=400)
        
        serializer = BebidasSerializer(data=data)
        
        if serializer.is_valid():
            bebida = serializer.save()
            return JsonResponse(BebidasSerializer(bebida).data, status=201)
        
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@require_http_methods(["GET", "PUT", "PATCH", "DELETE"])
def retrieve_bebida(request, pk):
    """
    Maneja las solicitudes HTTP para una bebida específica.

    Esta vista permite obtener, actualizar parcialmente, actualizar completamente o eliminar una bebida específica 
    identificada por su clave primaria (pk).

    - GET: Obtiene los detalles de una bebida específica y devuelve los datos en formato JSON.
    - PUT: Actualiza completamente los detalles de una bebida específica con los datos proporcionados en el cuerpo 
      de la solicitud y devuelve los datos actualizados en formato JSON.
    - PATCH: Actualiza parcialmente los detalles de una bebida específica con los datos proporcionados en el cuerpo 
      de la solicitud y devuelve los datos actualizados en formato JSON.
    - DELETE: Elimina una bebida específica y devuelve una respuesta vacía con el estado 204.

    Parámetros:
        - pk (int): La clave primaria de la bebida a la que se accede o se modifica.

    Respuestas:
        - 200 OK: Si la solicitud GET o PUT/PATCH es exitosa, devuelve los datos de la bebida en formato JSON.
        - 204 No Content: Si la solicitud DELETE es exitosa, devuelve una respuesta vacía con el estado 204.
        - 400 Bad Request: Si los datos proporcionados en la solicitud PUT/PATCH no son válidos o si hay un error en 
          el JSON enviado.
        - 404 Not Found: Si la bebida con la clave primaria especificada no se encuentra.
    """
    try:
        instance = Bebidas.objects.get(pk=pk)
    except Bebidas.DoesNotExist:
        return JsonResponse({'error': 'Bebida no encontrada'}, status=404)
    
    if request.method == 'GET':
        serializer = BebidasSerializer(instance)
        return JsonResponse(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud JSON inválida'}, status=400)
        
        partial = request.method == "PATCH"
        serializer = BebidasSerializer(instance, data=data, partial=partial)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        instance.delete()
        return HttpResponse(status=204)
