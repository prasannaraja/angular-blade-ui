import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from '../welcome/welcome.component'
import { WelcomeRoutingModule } from './welcome-routing.module';
import { ButtonModule } from 'src/app/shared/controls/button/button.module';

@NgModule({
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    ButtonModule
  ]
})
export class WelcomeModule { }
