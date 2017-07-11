from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

from api.serializers import LibrarySerializer
from api.models import Library


@api_view(['GET'])
def get_libraries(request):
    libraries = Library.objects.all()
    library_serializer = LibrarySerializer(libraries, many=True)
    return Response(library_serializer.data)


@api_view(['GET'])
def get_library(request, pk):
    if Library.objects.filter(pk=pk).exists():
        library = Library.objects.get(pk=pk)
        library_serializer = LibrarySerializer(instance=library, many=False)
        return Response(library_serializer.data)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def create_library(request):
    data = JSONParser().parse(request)
    library_serializer = LibrarySerializer(data=data)
    library_serializer.is_valid(raise_exception=True)
    library_serializer.save()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['POST'])
def update_library(request, pk):
    library = Library.objects.get(pk=pk)
    data = JSONParser().parse(request)
    library_serializer = LibrarySerializer(instance=library, data=data)
    if library_serializer.is_valid():
        library_serializer.save()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    else:
        return HttpResponse(library_serializer.errors)


@api_view(['GET'])
def delete_library(request, pk):
    if Library.objects.filter(pk=pk).exists:
        Library.objects.get(pk=pk).delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
