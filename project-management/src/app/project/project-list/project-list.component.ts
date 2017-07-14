import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  project: Project;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }
  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }
 
  selectProject(project: Project): void {
    this.project = project
  }

 deleteProject(project: Project): void {
  this.projectService
    .deleteProject(project.id)
    .then(() => {
      this.project = null;
      this.getProjects();
     });
 }

}
