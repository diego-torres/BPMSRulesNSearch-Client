import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project/project-list.component';
import { ProjectAddComponent } from './project/project-add.component';
import { ProjectEditComponent } from './project/project-edit.component';
import { CloudProvidersComponent } from './cloud-providers/cloud-providers.component';
import { DataIngestionComponent } from './data-ingestion/data-ingestion.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
    { path:'', redirectTo: '/projects', pathMatch: 'full'},
    { path:'projects', component: ProjectListComponent },
    { path:'projects/add', component: ProjectAddComponent },
    { path:'projects/edit/:id', component: ProjectEditComponent },
    { path:'projects/:id/cloud', component: CloudProvidersComponent },
    { path:'projects/:id/dataIngestion', component: DataIngestionComponent },
    { path:'projects/:id/dataVisualization', component: DataVisualizationComponent },
    { path:'projects/:id/summary', component: SummaryComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }