import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewAccommodationsComponent} from "./view-accommodations/view-accommodations.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationComponent } from './accommodation/accommodation.component';

@NgModule({
  declarations: [
    ViewAccommodationsComponent,
       AccommodationDetailsComponent,
    AccommodationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ViewAccommodationsComponent,
     AccommodationDetailsComponent
  ]
})
export class AccommodationsModule { }
