import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutTopnavModule } from './core/layout-topnav/layout-topnav.module';
import { MaterialModules } from './material-modules';
import { LayoutComponent } from './shared/layout/layout.component';

const modules = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModules,
  LayoutTopnavModule
]

@NgModule({
  imports:[...modules],
  exports: [...modules,LayoutComponent],
  declarations:[LayoutComponent]
})
export class SharedModule{ }
