import { ComoPipe } from './pipes/como.pipe';
import { SharedModule } from './../sharedModule/shared.module';

import { WebApiRoutingModule } from './webapi-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDtosComponent } from './components/dtos/gestion-dtos/gestion-dtos.component';
import { ArbolDTOComponent } from './components/dtos/arbol-dto/arbol-dto.component';



@NgModule({
  declarations: [
    GestionDtosComponent,
    ArbolDTOComponent,
    ComoPipe
  ],
  imports: [
    CommonModule,
    WebApiRoutingModule,
    SharedModule,

    
  ]
})
export class WebapiModule { }
