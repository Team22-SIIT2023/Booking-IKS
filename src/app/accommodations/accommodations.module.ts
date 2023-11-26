import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { AccommodationComponent } from './accommodation/accommodation.component';


@NgModule({
  declarations: [
    AccommodationDetailsComponent,
    AccommodationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AccommodationDetailsComponent
  ]
})
export class AccommodationsModule { }
