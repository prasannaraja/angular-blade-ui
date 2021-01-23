import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferenceDataComponent } from './reference-data.component';

const routes: Routes = [
  {
    path: '',
    component: ReferenceDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceDataRoutingModule { }
