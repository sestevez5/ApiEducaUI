import { PageDtosComponent } from './components/dtos/pageDtos/pageDtos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', component: PageDtosComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebApiRoutingModule { }
