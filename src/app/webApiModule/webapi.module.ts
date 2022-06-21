import { ComoPipe } from './pipes/como.pipe';
import { SharedModule } from './../sharedModule/shared.module';

import { WebApiRoutingModule } from './webapi-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWebApiComponent } from './components/comunes/pageWebApi/pageWebApi.component';
import { ArbolDTOComponent } from './components/dtos/arbol-dto/arbol-dto.component';
import { FormsModule } from '@angular/forms';

import { SidenavDtosComponent } from './components/dtos/sidenavDtos/sidenavDtos.component';
import { MainDtosComponent } from './components/dtos/main-dtos/main-dtos.component';
import { PanelParametrosComponent } from './components/dtos/panel-parametros/panel-parametros.component';
import { BuscadorComponent } from './components/comunes/buscador/buscador.component';
import { SelectorAgrupacionesComponent } from './components/dtos/selector-agrupaciones/selector-agrupaciones.component';




@NgModule({
  declarations: [
    PageWebApiComponent,
    ArbolDTOComponent,
    ComoPipe,
    SidenavDtosComponent,
    MainDtosComponent,
    PanelParametrosComponent,
    BuscadorComponent,
    SelectorAgrupacionesComponent
  ],
  imports: [
    CommonModule,
    WebApiRoutingModule,
    SharedModule,
    FormsModule
 

    
  ]
})
export class WebapiModule { }
