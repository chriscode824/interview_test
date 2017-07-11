from rest_framework import serializers
from api.models import Library
from api.models import Project
from api.models import ProjectLibrary


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ['library', 'version_number']


class ProjectLibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectLibrary
        fields = ['library', 'project']


class ProjectLibrariesSerializer(serializers.ModelSerializer):
    version_number = serializers.CharField(source='library.version_number')
    class Meta:
        model = ProjectLibrary
        fields = ['library', 'version_number']


class ProjectSerializer(serializers.ModelSerializer):
    libraries = ProjectLibrariesSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = ['id', 'active_start_date', 'active_end_date', 'client_name', 'description', 'git_url', 'testing_url', 'production_url', 'libraries']

