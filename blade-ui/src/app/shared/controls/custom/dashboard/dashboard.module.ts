import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { CheckboxModule } from '../../primeNg/checkbox/checkbox.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MatDividerModule, MatGridListModule, CheckboxModule],
  exports:[DashboardComponent]
})
export class DashboardModule { }
