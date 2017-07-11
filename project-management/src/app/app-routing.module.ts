import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent }  from './project/project-list/project-list.component';
import { ProjectComponent } from './project/project/project.component';
import { PageNotFoundComponent }    from './not-found.component';

const appRoutes: Routes = [
  {
    path: 'projects', component: ProjectListComponent,
  },
    {
    path: 'projects/new', component: ProjectComponent,
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
