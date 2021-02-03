import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from '../welcome/welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { DashboardModule } from 'src/app/shared/controls/dashboard/dashboard.module';
import { LazyGridModule } from 'src/app/shared/controls/lazy-grid/lazy-grid.module';

@NgModule({
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  imports: [CommonModule, WelcomeRoutingModule, DashboardModule, LazyGridModule],
})
export class WelcomeModule {}
