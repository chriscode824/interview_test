import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent }  from './project/project-list/project-list.component';
import { ProjectComponent } from './project/project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { PageNotFoundComponent }    from './not-found.component';

const appRoutes: Routes = [
  {
    path: 'projects', component: ProjectListComponent,
  },
  {
    path: 'projects/new', component: ProjectComponent,
  },
  {
    path: 'projects/:id/edit', component: ProjectComponent,
  },
  {
    path: 'projects/:id', component: ProjectDetailComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class AppRoutingModule { }
