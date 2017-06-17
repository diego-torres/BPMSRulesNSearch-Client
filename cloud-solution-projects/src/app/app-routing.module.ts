import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project/project-list.component';

const routes: Routes = [
    { path:'', redirectTo: '/projects', pathMatch: 'full'},
    { path:'projects', component: ProjectListComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }