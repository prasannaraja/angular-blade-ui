import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [InputComponent],
  exports:[InputComponent],
  imports: [CommonModule, MatInputModule]
})
export class InputModule { }
