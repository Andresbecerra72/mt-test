import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ComponentModule } from './components/component.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ComponentModule],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
