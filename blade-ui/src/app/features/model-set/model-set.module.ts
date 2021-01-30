import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelSetRoutingModule } from './model-set-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ModelSetComponent } from './model-set.component';
import { BladerModule } from 'src/app/shared/blader/blader.module';

@NgModule({
  declarations: [ModelSetComponent],
  imports: [
    CommonModule,
    BladerModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    ModelSetRoutingModule,
  ]
})
export class ModelSetModule { }
