import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewAccommodationsComponent} from "./view-accommodations/view-accommodations.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {RouterLink} from "@angular/router";
import {LayoutModule} from "../layout/layout.module";
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { EditAccommodationsDatesComponent } from './edit-accommodations-dates/edit-accommodations-dates.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ViewAccommodationsComponent,
    AccommodationDetailsComponent,
    AccommodationComponent,
    AccommodationCardComponent,
    CreateAccommodationComponent,
    EditAccommodationsDatesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    LayoutModule,
    SharedModule
  ],
  exports: [
    ViewAccommodationsComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent
  ]
})
export class AccommodationsModule { }
