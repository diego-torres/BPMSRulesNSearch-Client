import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project/project-list.component';

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent, ProjectListComponent
  ],
  imports: [
    BrowserModule, NgxDatatableModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
