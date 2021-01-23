import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutTopnavComponent } from './layout-topnav.component';
import { MaterialModules } from 'src/app/material-modules';

@NgModule({
  declarations: [LayoutTopnavComponent],
  exports:[LayoutTopnavComponent],
  imports: [
    CommonModule,
    MaterialModules
  ]
})
export class LayoutTopnavModule { }
