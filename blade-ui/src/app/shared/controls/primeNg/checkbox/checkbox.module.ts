import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxModule as CheckboxPrimeNg} from "primeng/checkbox";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, CheckboxPrimeNg, FormsModule],
  exports: [CheckboxComponent, CheckboxPrimeNg, FormsModule],
})
export class CheckboxModule {}
