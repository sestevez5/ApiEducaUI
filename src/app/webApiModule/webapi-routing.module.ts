import { PageWebApiComponent } from './components/comunes/pageWebApi/pageWebApi.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', component: PageWebApiComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebApiRoutingModule { }
