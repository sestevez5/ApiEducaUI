import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionDtosComponent } from './componentes/dtos/gestion-dtos/gestion-dtos.component';
import { ListaDtosComponent } from './componentes/dtos/lista-dtos/lista-dtos.component';
import { DetalleDtoComponent } from './componentes/dtos/detalle-dto/detalle-dto.component';
import { DetalleEndpointComponent } from './componentes/endpoints/detalle-endpoint/detalle-endpoint.component';
import { ListaEndpointsComponent } from './componentes/endpoints/lista-endpoints/lista-endpoints.component';
import { GestionEndpointsComponent } from './componentes/endpoints/gestion-endpoints/gestion-endpoints.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionDtosComponent,
    ListaDtosComponent,
    DetalleDtoComponent,
    DetalleEndpointComponent,
    ListaEndpointsComponent,
    GestionEndpointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
