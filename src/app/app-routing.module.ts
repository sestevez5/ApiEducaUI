import { GestionEndpointsComponent } from './componentes/endpoints/gestion-endpoints/gestion-endpoints.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDtosComponent } from './componentes/dtos/gestion-dtos/gestion-dtos.component';

const routes: Routes = [
  {
    path: '',
    component: GestionDtosComponent
  },
  {
    path: 'endpoints',
    component: GestionEndpointsComponent
  },
  {
    path: 'dtos',
    component: GestionDtosComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
