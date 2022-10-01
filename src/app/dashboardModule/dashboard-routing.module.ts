import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', component: DashboardComponent,
    children:  [
      { path: '', redirectTo: 'webapi', pathMatch: 'full'},
      { path: 'inicio', component: InicioComponent },
      { path: 'webapi', loadChildren: () => import('../webApiModule/webapi.module').then(x => x.WebapiModule) },


    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
