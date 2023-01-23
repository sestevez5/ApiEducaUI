import { ComoPipe } from './pipes/como.pipe';
import { SharedModule } from './../sharedModule/shared.module';

import { WebApiRoutingModule } from './webapi-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWebApiComponent } from './components/comunes/pageWebApi/pageWebApi.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';




import { SelectorAgrupacionesComponent } from './components/comunes/selector-agrupaciones/selector-agrupaciones.component';
import { MainSchemasComponent } from './components/schemas/main-schemas/main-schemas.component';
import { ArbolSchemasComponent } from './components/schemas/arbol-schemas/arbol-schemas.component';
import { MainOperationsComponent } from './components/operations/main-operators/main-operations.component';
import { ArbolOperationsComponent } from './components/operations/arbol-operations/arbol-operations.component';
import { ParameterOperationComponent } from './components/operations/parameter-operation/parameter-operation.component';
import { ParametersOperationComponent } from './components/operations/parameters-operation/parameters-operation.component';
import { MainPropertiesComponent } from './components/properties/main-schemas/main-properties.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { PanelExecuteOperationComponent } from './components/operations/panel-execute-operation/panel-execute-operation.component';
import { GestionarTokenComponent } from './components/comunes/gestionar-token/gestionar-token.component';
import { PanelOperationInformationExecutionComponent } from './components/operations/panel-operation-information-execution/panel-operation-information-execution.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ResponseOperationComponent } from './components/operations/response-operation/response-operation.component';
import { ResponsesOperationComponent } from './components/operations/responses-operation/responses-operation.component';
import { SelectorDocumentoOpenapi3Component } from './components/comunes/selector-documento-openapi3/selector-documento-openapi3.component';
import { ItemDocumentoOpenApi3Component } from './components/comunes/item-documento-openapi3/item-documento-openapi3.component';
import { MatCardModule } from '@angular/material/card';
import { TablaPropertiesComponent } from './components/properties/tabla-properties/tabla-properties.component';

import {MatTooltipModule} from '@angular/material/tooltip';



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
    PanelExecuteOperationComponent,
    GestionarTokenComponent,
    PanelOperationInformationExecutionComponent,
    ResponseOperationComponent,
    ResponsesOperationComponent,
    SelectorDocumentoOpenapi3Component,
    ItemDocumentoOpenApi3Component,
    MainPropertiesComponent,
    TablaPropertiesComponent
      
  ],
  imports: [
    CommonModule,
    WebApiRoutingModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    MatCardModule,
    MatTooltipModule
 
  ]
})
export class WebapiModule { }
