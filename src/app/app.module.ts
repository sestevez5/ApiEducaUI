import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './sharedModule/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { LoginComponent } from './componentes/general/login/login.component';
import { MatFormFieldModule} from '@angular/material/form-field';

import {MatTooltipModule} from '@angular/material/tooltip'

import { MatTableModule } from '@angular/material/table'





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTableModule
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
