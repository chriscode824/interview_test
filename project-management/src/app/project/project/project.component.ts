import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.models';
import { FormBuilder, FormGroup, FormControl, FormArray, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {
  projects: Project[];
  project: Project;
  projectForm = new FormGroup ({
    active_start_date: new FormControl(),
    active_end_date: new FormControl(),
    client_name: new FormControl(),
    description: new FormControl(),
    git_url: new FormControl(),
    testing_url: new FormControl(),
    production_url: new FormControl()
  });

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    
  }
  addProject(project: Project): void {
    this.project = new Project();
    this.project.active_start_date = this.projectForm.get('active_start_date').value
    this.project.active_end_date = this.projectForm.get('active_end_date').value
    this.project.client_name = this.projectForm.get('client_name').value
    this.project.description = this.projectForm.get('description').value
    this.project.git_url = this.projectForm.get('git_url').value
    this.project.testing_url = this.projectForm.get('testing_url').value
    this.project.production_url = this.projectForm.get('production_url').value
    this.projectService.addProject(this.project);
    this.router.navigate(['../projects', {relativeTo:this.route}])
  }
  selectProject(project: Project): void {
   console.log(project.id);
   this.project = project
}

 deleteProject(project: Project): void {
   console.log(project.id);

  this.projectService
    .deleteProject(project.id)
    .then(() => {
      this.project = null;
     });
}


}
