from django.contrib import admin

from api.models import Library
from api.models import Project
from api.models import ProjectLibrary


@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    list_display = ['id','description', 'active_start_date', 'active_end_date']
    fields = ('description', 'active_start_date', 'active_end_date')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'active_start_date', 'active_end_date', 'client_name', 'description', 'git_url', 'testing_url', 'production_url']
    fields = ('active_start_date', 'active_end_date', 'client_name', 'description', 'git_url', 'testing_url', 'production_url')


@admin.register(ProjectLibrary)
class ProjectLibraryAdmin(admin.ModelAdmin):
    list_display = ['id', 'project', 'library', 'version_number']
    fields = ('project', 'library', 'version_number')
