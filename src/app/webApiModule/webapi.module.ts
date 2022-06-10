import { ComoPipe } from './pipes/como.pipe';
import { SharedModule } from './../sharedModule/shared.module';

import { WebApiRoutingModule } from './webapi-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDtosComponent } from './components/dtos/pageDtos/pageDtos.component';
import { ArbolDTOComponent } from './components/dtos/arbol-dto/arbol-dto.component';
import { FormsModule } from '@angular/forms';

import { SidenavDtosComponent } from './components/dtos/sidenavDtos/sidenavDtos.component';
import { MainDtosComponent } from './components/dtos/main-dtos/main-dtos.component';
import { ArbolAgrupamientosComponent } from './components/comunes/arbol-agrupamientos/arbol-agrupamientos.component'



@NgModule({
  declarations: [
    PageDtosComponent,
    ArbolDTOComponent,
    ComoPipe,
    SidenavDtosComponent,
    MainDtosComponent,
    ArbolAgrupamientosComponent
  ],
  imports: [
    CommonModule,
    WebApiRoutingModule,
    SharedModule,
    FormsModule
 

    
  ]
})
export class WebapiModule { }
