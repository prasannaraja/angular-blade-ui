import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladerComponent } from './blader/blader.component';
import { BladesContainerComponent } from './blades-container/blades-container.component';
import { MaterialModules } from 'src/app/material-modules';
import { BladeComponent } from './blade/blade.component';

@NgModule({
  imports: [
    CommonModule, 
    MaterialModules
  ],
  declarations: [BladerComponent, BladeComponent, BladesContainerComponent ],
  exports:[BladerComponent, BladesContainerComponent],
  providers:[]
})
export class BladerModule { }
