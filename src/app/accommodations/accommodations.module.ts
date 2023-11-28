import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewAccommodationsComponent} from "./view-accommodations/view-accommodations.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {RouterLink} from "@angular/router";
import {LayoutModule} from "../layout/layout.module";

@NgModule({
  declarations: [
    ViewAccommodationsComponent,
    AccommodationDetailsComponent,
    AccommodationComponent,
    AccommodationCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    LayoutModule
  ],
  exports:[
    ViewAccommodationsComponent,
    AccommodationDetailsComponent
  ]
})
export class AccommodationsModule { }
