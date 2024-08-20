from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Pedidos
from .serializers import PedidosSerializer
import json


@csrf_exempt
@require_http_methods(["GET", "POST"])
def list_pedidos(request):
    """
    Maneja solicitudes GET y POST para la lista de pedidos.

    - GET: Retorna una lista de todos los pedidos en formato JSON.
    - POST: Crea un nuevo pedido a partir de los datos JSON proporcionados.

    Parámetros:
        - request: Objeto HttpRequest que contiene la solicitud.

    Respuestas:
        - JSON con la lista de pedidos para GET.
        - JSON con los detalles del nuevo pedido creado o errores de validación para POST.
    """
    if request.method == "GET":
        queryset = Pedidos.objects.all()
        serializer = PedidosSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud JSON inválida'}, status=400)
        
        serializer = PedidosSerializer(data=data)
        
        if serializer.is_valid():
            pedido = serializer.save()
            return JsonResponse(PedidosSerializer(pedido).data, status=201)
        
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@require_http_methods(["GET", "PUT", "PATCH", "DELETE"])
def retrieve_pedidos(request, pk):
    """
    Maneja solicitudes GET, PUT, PATCH y DELETE para un pedido específico.

    - GET: Retorna los detalles del pedido especificado por `pk`.
    - PUT/PATCH: Actualiza el pedido especificado con los datos JSON proporcionados.
    - DELETE: Elimina el pedido especificado.

    Parámetros:
        - request: Objeto HttpRequest que contiene la solicitud.
        - pk: ID del pedido a operar.

    Respuestas:
        - JSON con los detalles del pedido para GET.
        - JSON con los datos del pedido actualizado o errores de validación para PUT/PATCH.
        - Respuesta vacía con estado 204 para DELETE.
        - JSON con un mensaje de error si el pedido no es encontrado.
    """
    try:
        instance = Pedidos.objects.get(pk=pk)
    except Pedidos.DoesNotExist:
        return JsonResponse({'error': 'Pedido no encontrado'}, status=404)
    
    if request.method == 'GET':
        serializer = PedidosSerializer(instance)
        return JsonResponse(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud JSON inválida'}, status=400)
        
        partial = request.method == "PATCH"
        serializer = PedidosSerializer(instance, data=data, partial=partial)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        instance.delete()
        return HttpResponse(status=204)
