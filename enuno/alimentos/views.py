from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import Alimentos
from .serializers import AlimentosSerializer

@csrf_exempt
@require_http_methods(["GET", "POST"])
def alimentos_list(request):
    """
    Maneja las solicitudes GET y POST para la lista de alimentos.

    - **GET**: Obtiene una lista de todos los alimentos en la base de datos.
      Devuelve los datos en formato JSON.
    - **POST**: Crea un nuevo alimento con los datos proporcionados en el cuerpo
      de la solicitud. Valida los datos y, si son válidos, guarda el nuevo objeto
      en la base de datos y devuelve los datos del alimento creado en formato JSON.

    Args:
        request (HttpRequest): La solicitud HTTP que se maneja.

    Returns:
        JsonResponse: Respuesta JSON con los datos de los alimentos o errores de
        validación. Para una solicitud POST exitosa, se devuelve un estado 201;
        para errores de validación, se devuelve un estado 400.
    """
    if request.method == 'GET':
        id_rest = request.GET.get('id_rest')
        
        if not id_rest:
            return JsonResponse({'error': 'El ID del restaurante es requerido.'}, status=400)
        
        alimentos = Alimentos.objects.filter(id_restaurante_id=id_rest)
        serializer = AlimentosSerializer(alimentos, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = AlimentosSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def alimentos_detail(request, pk):
    """
    Maneja las solicitudes GET, PUT y DELETE para un alimento específico.

    - **GET**: Obtiene los detalles de un alimento específico por su ID (`pk`).
      Devuelve los datos en formato JSON. Si el alimento no existe, devuelve un estado 404.
    - **PUT**: Actualiza un alimento específico con los datos proporcionados en
      el cuerpo de la solicitud. Valida los datos y, si son válidos, guarda los
      cambios en la base de datos. Devuelve los datos actualizados en formato JSON
      o errores de validación. Si el alimento no existe, devuelve un estado 404.
    - **DELETE**: Elimina un alimento específico por su ID (`pk`) de la base de datos.
      Devuelve un estado 204 si la eliminación es exitosa, o un estado 404 si el alimento no existe.

    Args:
        request (HttpRequest): La solicitud HTTP que se maneja.
        pk (int): El identificador único del alimento a manejar.

    Returns:
        JsonResponse: Respuesta JSON con los datos del alimento o errores de validación
        para una solicitud PUT.
        HttpResponse: Respuesta HTTP con un estado 204 para una eliminación exitosa
        o un estado 404 si el alimento no existe.
    """
    try:
        instance = Alimentos.objects.get(pk=pk)
    except Alimentos.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = AlimentosSerializer(instance)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = AlimentosSerializer(instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        instance.delete()
        return HttpResponse(status=204)
