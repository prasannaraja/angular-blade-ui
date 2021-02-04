import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MatDividerModule, MatGridListModule],
  exports:[DashboardComponent]
})
export class DashboardModule { }
