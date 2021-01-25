import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ZingchartAngularModule } from 'zingchart-angular';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule,ZingchartAngularModule],
  exports:[DashboardComponent]
})
export class DashboardModule { }
