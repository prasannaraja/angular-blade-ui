import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutTopnavComponent } from './layout-topnav.component';
import { MaterialModules } from 'src/app/material-modules';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutTopnavComponent],
  exports: [LayoutTopnavComponent],
  imports: [CommonModule, MaterialModules, RouterModule],
})
export class LayoutTopnavModule {}
