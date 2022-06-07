import { SharedModule } from './../sharedModule/shared.module';

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
    SharedModule
    
  ]
})
export class WebapiModule { }
