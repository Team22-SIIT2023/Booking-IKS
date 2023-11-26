import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";

const routes: Routes = [
  {component: AccommodationDetailsComponent, path:"accommodationDetails"},
  // {component: HomeComponent, path:"home"},
  // {component: CreateWineComponent, path:"create"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
