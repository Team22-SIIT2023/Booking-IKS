import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MaterialModule} from "../infrastructure/material/material.module";

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
  ],
})
export class LayoutModule { }
