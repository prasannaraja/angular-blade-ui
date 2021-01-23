import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelSetComponent } from './model-set.component';

const routes: Routes = [
  {
    path: '',
    component: ModelSetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelSetRoutingModule { }
