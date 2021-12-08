import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyGridComponent } from './lazy-grid.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [LazyGridComponent],
  exports:[LazyGridComponent],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class LazyGridModule { }
