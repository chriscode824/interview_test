from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from api.api_view import project
from api.api_view import library
from api.api_view import project_library

urlpatterns = [
    url(r'^api/libraries/$', library.get_libraries),
    url(r'^api/libraries/(?P<pk>[0-9]+)/$', library.get_library),
    url(r'^api/libraries/new', library.create_library),
    url(r'^api/libraries/(?P<pk>[0-9]+)/update', library.update_library),
    url(r'^api/libraries/(?P<pk>[0-9]+)/delete/$', library.delete_library),

    url(r'^api/projects/$', project.get_projects),
    url(r'^api/projects/(?P<pk>[0-9]+)/$', project.get_project),
    url(r'^api/projects/new', project.create_project),
    url(r'^api/projects/(?P<pk>[0-9]+)/update', project.update_project),
    url(r'^api/projects/(?P<pk>[0-9]+)/delete/', project.delete_project),

    url(r'^api/project_libraries/$', project_library.get_project_libraries),
    url(r'^api/project_libraries/(?P<pk>[0-9]+)/$', project_library.get_project_library),
    url(r'^api/project_libraries/new', project_library.create_project_library),
    url(r'^api/project_libraries/(?P<pk>[0-9]+)/update', project_library.update_project_library),
    url(r'^api/project_libraries/(?P<pk>[0-9]+)/delete/', project_library.delete_project_library),

]

urlpatterns = format_suffix_patterns(urlpatterns)
