# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-07-12 23:02
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Library',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(choices=[('DJ', 'Django'), ('TW', 'Twitter Bootstrap'), ('JQ', 'JQuery')], max_length=45, unique=True)),
                ('active_start_date', models.DateField()),
                ('active_end_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active_start_date', models.DateField()),
                ('active_end_date', models.DateField()),
                ('client_name', models.CharField(max_length=45)),
                ('description', models.CharField(max_length=100)),
                ('git_url', models.CharField(max_length=250)),
                ('testing_url', models.CharField(max_length=250)),
                ('production_url', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectLibrary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version_number', models.CharField(max_length=10)),
                ('library', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_library', to='api.Library')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='libraries', to='api.Project')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='projectlibrary',
            unique_together=set([('project', 'library')]),
        ),
    ]
