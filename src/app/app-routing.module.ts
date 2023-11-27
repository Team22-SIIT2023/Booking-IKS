import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewAccommodationsComponent} from "./accommodations/view-accommodations/view-accommodations.component";
import {HeaderComponent} from "./layout/header/header.component";
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";

const routes: Routes = [
  {component: AccommodationDetailsComponent, path:"accommodationDetails"},
  {component: ViewAccommodationsComponent, path:"home/accommodations"},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",component:HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
