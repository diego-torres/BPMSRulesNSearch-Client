import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project/project-list.component';
import { ProjectAddComponent } from './project/project-add.component';
import { CloudProvidersComponent } from './cloud-providers/cloud-providers.component';
import { DataIngestionComponent } from './data-ingestion/data-ingestion.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { SummaryComponent } from './summary/summary.component';

import { ProjectService } from './project/project.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent, 
    ProjectListComponent, 
    ProjectAddComponent, 
    CloudProvidersComponent, 
    DataIngestionComponent,
    DataVisualizationComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule, NgxDatatableModule, AppRoutingModule, ReactiveFormsModule, HttpModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
