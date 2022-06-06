import { HttpClientModule } from '@angular/common/http';
import { WebApiRoutingModule } from './webapi-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDtosComponent } from './components/dtos/gestion-dtos/gestion-dtos.component';



@NgModule({
  declarations: [
    GestionDtosComponent
  ],
  imports: [
    CommonModule,
    WebApiRoutingModule,
    HttpClientModule
    
  ]
})
export class WebapiModule { }
