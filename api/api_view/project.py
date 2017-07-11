from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

from api.serializers import ProjectSerializer
from api.models import Project


@api_view(['GET'])
def get_projects(request):
    libraries = Project.objects.all()
    library_serializer = ProjectSerializer(libraries, many=True)
    data = library_serializer.data
    print(data)
    return Response(data)


@api_view(['GET'])
def get_project(request, pk):
    if Project.objects.filter(pk=pk).exists():
        project = Project.objects.get(pk=pk)
        library_serializer = ProjectSerializer(instance=project, many=False)
        return Response(library_serializer.data)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def create_project(request):
    data = JSONParser().parse(request)
    library_serializer = ProjectSerializer(data=data)
    library_serializer.is_valid(raise_exception=True)
    library_serializer.save()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['POST'])
def update_project(request, pk):
    project = Project.objects.get(pk=pk)
    data = JSONParser().parse(request)
    library_serializer = ProjectSerializer(instance=project, data=data)
    if library_serializer.is_valid():
        library_serializer.save()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    else:
        return HttpResponse(library_serializer.errors)


@api_view(['GET'])
def delete_project(request, pk):
    if Project.objects.filter(pk=pk).exists:
        Project.objects.get(pk=pk).delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
