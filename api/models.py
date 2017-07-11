from __future__ import unicode_literals

from django.db import models


class Library(models.Model):
    DJANGO = 'DJ'
    TWITTER_BOOTSTRAP = 'TW'
    JQUERY = 'JQ'
    LIBRARY_CHOICES = (
        (DJANGO, 'Django'),
        (TWITTER_BOOTSTRAP, 'Twitter Bootstrap'),
        (JQUERY, 'JQuery'),
    )
    library = models.CharField(max_length=45, choices=LIBRARY_CHOICES, unique=True)
    version_number = models.CharField(max_length=10)

    def __str__(self):
        return self.library


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
    class Meta:
        unique_together = (("project", "library"),)
