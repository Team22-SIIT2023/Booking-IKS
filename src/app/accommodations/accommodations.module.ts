import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewAccommodationsComponent} from "./view-accommodations/view-accommodations.component";
import {MaterialModule} from "../infrastructure/material/material.module";

@NgModule({
  declarations: [
    ViewAccommodationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule

  ],
  exports:[
    ViewAccommodationsComponent
  ]
})
export class AccommodationsModule { }
