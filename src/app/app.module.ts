import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


// Componentes
import { GestionDtosComponent } from './componentes/dtos/gestion-dtos/gestion-dtos.component';
import { ListaDtosComponent } from './componentes/dtos/lista-dtos/lista-dtos.component';
import { DetalleDtoComponent } from './componentes/dtos/detalle-dto/detalle-dto.component';
import { DetalleEndpointComponent } from './componentes/endpoints/detalle-endpoint/detalle-endpoint.component';
import { ListaEndpointsComponent } from './componentes/endpoints/lista-endpoints/lista-endpoints.component';
import { GestionEndpointsComponent } from './componentes/endpoints/gestion-endpoints/gestion-endpoints.component';
import { LoginComponent } from './componentes/general/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionDtosComponent,
    ListaDtosComponent,
    DetalleDtoComponent,
    DetalleEndpointComponent,
    ListaEndpointsComponent,
    GestionEndpointsComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
