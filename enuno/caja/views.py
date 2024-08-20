from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Caja
from .serializers import CajaSerializer
import json


@csrf_exempt
@require_http_methods(["GET", "POST"])
def list_caja(request):
    """
    Maneja solicitudes para la lista de cajas.

    - GET: Obtiene todas las cajas y devuelve los datos en formato JSON.
    - POST: Crea una nueva caja con los datos proporcionados y devuelve los datos de la caja creada.

    Respuestas:
        - 200 OK: Lista de cajas en formato JSON.
        - 201 Created: Datos de la caja creada en formato JSON.
        - 400 Bad Request: Error si los datos no son válidos o el JSON es inválido.
    """
    if request.method == "GET":
        queryset = Caja.objects.all()
        serializer = CajaSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud JSON inválida'}, status=400)
        
        serializer = CajaSerializer(data=data)
        
        if serializer.is_valid():
            caja = serializer.save()
            return JsonResponse(CajaSerializer(caja).data, status=201)
        
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@require_http_methods(["GET", "PUT", "PATCH", "DELETE"])
def retrieve_caja(request, pk):
    """
    Maneja solicitudes para una caja específica.

    - GET: Obtiene los detalles de una caja específica.
    - PUT/PATCH: Actualiza los detalles de la caja especificada.
    - DELETE: Elimina la caja especificada.

    Parámetros:
        - pk (int): Clave primaria de la caja.

    Respuestas:
        - 200 OK: Datos de la caja en formato JSON (para GET, PUT, PATCH).
        - 204 No Content: Respuesta vacía tras eliminar la caja.
        - 400 Bad Request: Error si los datos no son válidos o el JSON es inválido.
        - 404 Not Found: Si la caja no se encuentra.
    """
    try:
        instance = Caja.objects.get(pk=pk)
    except Caja.DoesNotExist:
        return JsonResponse({'error': 'Caja no encontrada'}, status=404)
    
    if request.method == 'GET':
        serializer = CajaSerializer(instance)
        return JsonResponse(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud JSON inválida'}, status=400)
        
        partial = request.method == "PATCH"
        serializer = CajaSerializer(instance, data=data, partial=partial)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        instance.delete()
        return HttpResponse(status=204)
