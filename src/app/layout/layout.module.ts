import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink, RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterModule
  ],
    exports: [
        NavBarComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
    ],
})
export class LayoutModule { }
