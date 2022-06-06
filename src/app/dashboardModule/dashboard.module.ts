import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './../sharedModule/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';





@NgModule({
  declarations: [
    
    DashboardComponent,
    InicioComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule  ]
})
export class DashboardModule { }
