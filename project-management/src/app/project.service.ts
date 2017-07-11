import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http'
import { Project } from './models/project.models';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {

  private baseUrl: string = 'http://localhost:8000/api/projects/';
  private jsonFormat: string = '?format=json';
  private headers = new Headers({'content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProjects(): Promise<Project[]> {
   // let headers = new Headers( {'Content-Type': 'application/json' });
  //  let options = new RequestOptions(headers);
    const url = `${this.baseUrl}${this.jsonFormat}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Project[])
    .catch(this.handleError)
  }

  addProject(project: Project): any{
    const url = `${this.baseUrl}new`;
    var body = JSON.stringify(project);
     console.log(body);
    return this.http.post(url, body)
    .toPromise()
    //.then(response => response.json() as Project)
    .catch(this.handleError)
  }

  deleteProject(id: number): any{
    const url = `${this.baseUrl}${id}/delete/${this.jsonFormat}`;
    return this.http.get(url)
    .toPromise()
    .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}

}
