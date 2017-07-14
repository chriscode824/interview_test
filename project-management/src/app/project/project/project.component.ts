import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.models';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
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
  id: number;
  editing: boolean = false;
  private sub: any;


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
     this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; 
       if (this.id) {
          this.editing = true;
          this.loadProject(this.id);
       }
       else {
         this.editing = false;
       }
    });
  }

  loadProject(id: number) {
    this.project = new Project();
    this.projectService.getProject(id).then(project => {this.project = project;
      this.projectForm.patchValue({
        active_start_date: this.project.active_start_date, 
        active_end_date: this.project.active_end_date, 
        client_name: this.project.client_name, 
        description: this.project.description, 
        git_url: this.project.git_url, 
        testing_url: this.project.testing_url, 
        production_url: this.project.production_url
      });
    });
  }

  saveProject(): void {
    if (this.editing) {
      console.log("Updating Record.");
      var project = new Project();
      project.id = this.project.id;
      project.active_start_date = this.projectForm.get('active_start_date').value
      project.active_end_date = this.projectForm.get('active_end_date').value
      project.client_name = this.projectForm.get('client_name').value
      project.description = this.projectForm.get('description').value
      project.git_url = this.projectForm.get('git_url').value
      project.testing_url = this.projectForm.get('testing_url').value
      project.production_url = this.projectForm.get('production_url').value
      this.projectService.updateProject(project);
      this.router.navigate(['../projects', {relativeTo:this.route}])
    }
    else {
      console.log("Adding new Record");
      this.project = new Project();
      this.project.active_start_date = this.projectForm.get('active_start_date').value
      this.project.active_end_date = this.projectForm.get('active_end_date').value
      this.project.client_name = this.projectForm.get('client_name').value
      this.project.description = this.projectForm.get('description').value
      this.project.git_url = this.projectForm.get('git_url').value
      this.project.testing_url = this.projectForm.get('testing_url').value
      this.project.production_url = this.projectForm.get('production_url').value
      console.log("Project: "+ this.project);
      this.projectService.addProject(this.project);
      this.router.navigate(['../projects', {relativeTo:this.route}])
    }

  }
  selectProject(project: Project): void {
    console.log("Selected Project ID: "+ project.id);
    this.project = project
  }

 deleteProject(project: Project): void {
   console.log("Delete Project ID: "+ project.id);
   this.projectService
     .deleteProject(project.id)
     .then(() => {
        this.project = null;
      });
 }
}
