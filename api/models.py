from __future__ import unicode_literals

from django.db import models


class Library(models.Model):
    description = models.CharField(max_length=45, unique=True)
    active_start_date = models.DateField()
    active_end_date = models.DateField()

    def __str__(self):
        return self.description


class Project(models.Model):
    active_start_date = models.DateField()
    active_end_date = models.DateField()
    client_name = models.CharField(max_length=45)
    description = models.CharField(max_length=100)
    git_url = models.CharField(max_length=250)
    testing_url = models.CharField(max_length=250)
    production_url = models.CharField(max_length=250)

    def __str__(self):
        return self.description


class ProjectLibrary(models.Model):
    project = models.ForeignKey(Project, related_name='libraries')
    library = models.ForeignKey(Library, related_name='project_library')
    version_number = models.CharField(max_length=10)
    class Meta:
        unique_together = (("project", "library"),)
