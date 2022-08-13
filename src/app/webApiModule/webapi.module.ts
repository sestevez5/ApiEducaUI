import { ComoPipe } from './pipes/como.pipe';
import { SharedModule } from './../sharedModule/shared.module';

import { WebApiRoutingModule } from './webapi-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWebApiComponent } from './components/comunes/pageWebApi/pageWebApi.component';
import { FormsModule } from '@angular/forms';



import { SelectorAgrupacionesComponent } from './components/comunes/selector-agrupaciones/selector-agrupaciones.component';
import { MainSchemasComponent } from './components/schemas/main-schemas/main-schemas.component';
import { ArbolSchemasComponent } from './components/schemas/arbol-schemas/arbol-schemas.component';
import { MainOperationsComponent } from './components/operations/main-operators/main-operations.component';
import { ArbolOperationsComponent } from './components/operations/arbol-operations/arbol-operations.component';
import { ParameterOperationComponent } from './components/operations/parameter-operation/parameter-operation.component';
import { ParametersOperationComponent } from './components/operations/parameters-operation/parameters-operation.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [
    PageWebApiComponent,
    ComoPipe,
    SelectorAgrupacionesComponent,
    MainSchemasComponent,
    ArbolSchemasComponent,
    MainOperationsComponent,
    ArbolOperationsComponent,
    ParameterOperationComponent,
    ParametersOperationComponent,
   
  ],
  imports: [
    CommonModule,
    WebApiRoutingModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule
 

    
  ]
})
export class WebapiModule { }
