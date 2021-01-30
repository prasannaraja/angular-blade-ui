import { Routes, RouterModule } from '@angular/router';
import { BladesContainerComponent } from 'src/app/shared/blader/blades-container/blades-container.component';
import { ModelSetComponent } from './model-set.component';

export const MODELSET_ROUTES: Routes = [
  {
    path: '',
    component: ModelSetComponent,
    pathMatch: 'full',
  },
  {
    path:':id',
    component: BladesContainerComponent,
    children:[{ path:'**', component: BladesContainerComponent }],
  }
];

export const ModelSetRoutingModule = RouterModule.forChild(MODELSET_ROUTES)
