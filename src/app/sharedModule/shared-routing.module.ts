import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//   {
//     path: '',
//     component: GestionDtosComponent
//   },
//   {
//     path: 'endpoints',
//     component: GestionEndpointsComponent
//   },
//   {
//     path: 'dtos',
//     component: GestionDtosComponent
//   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
