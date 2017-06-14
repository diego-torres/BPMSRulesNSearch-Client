import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SummaryComponent } from './summary.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, HttpModule],
  declarations: [AppComponent, SummaryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
