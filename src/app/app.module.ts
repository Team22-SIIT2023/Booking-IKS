import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {LayoutModule} from "./layout/layout.module";
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";
import {AccommodationsModule} from "./accommodations/accommodations.module";
import { AccountModule } from './account/account.module';
import { RegistrationComponent } from './account/registration/registration.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AccommodationsModule,
    AccountModule
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
