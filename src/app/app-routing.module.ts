import { LoginComponent } from './componentes/general/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: '', redirectTo: 'webapi', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path:'dashboard', loadChildren: () => import('./dashboardModule/dashboard.module').then(x => x.DashboardModule)},
  { path:'webapi', loadChildren: () => import('./webApiModule/webapi.module').then(x => x.WebapiModule)},
  { path: '**', redirectTo: 'webapi', pathMatch:'full'}
  // { path: '**', redirectTo: 'login', pathMatch:'full'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
