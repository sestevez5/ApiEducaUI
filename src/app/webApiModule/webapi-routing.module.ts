import { GestionDtosComponent } from './components/dtos/gestion-dtos/gestion-dtos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', component: GestionDtosComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebApiRoutingModule { }
