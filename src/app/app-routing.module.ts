import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewAccommodationsComponent} from "./accommodations/view-accommodations/view-accommodations.component";
import {HeaderComponent} from "./layout/header/header.component";
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";
import {HomeComponent} from "./layout/home/home.component";
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { AccountManagementComponent } from './account/account-management/account-management.component';
import {CreateAccommodationComponent} from "./accommodations/create-accommodation/create-accommodation.component";
import {
  EditAccommodationsDatesComponent
} from "./accommodations/edit-accommodations-dates/edit-accommodations-dates.component";
import {AccommodationComponent} from "./accommodations/accommodation/accommodation.component";


const routes: Routes = [
  {component: AccommodationDetailsComponent, path:"home/accommodations/accommodationDetails/:id"},
  {component: AccommodationComponent, path:"accommodation"},
  {component: ViewAccommodationsComponent, path:"home/accommodations"},
  {component: CreateAccommodationComponent, path:"create"},
  {component: EditAccommodationsDatesComponent, path:"editDates"},
  {component: LoginComponent, path:"logIn"},
  {component: RegistrationComponent, path:"signIn"},
  {component: AccountManagementComponent, path:"myAccount"},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
