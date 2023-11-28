import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewAccommodationsComponent} from "./accommodations/view-accommodations/view-accommodations.component";
import {HeaderComponent} from "./layout/header/header.component";
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { AccountManagementComponent } from './account/account-management/account-management.component';

const routes: Routes = [
  {component: AccommodationDetailsComponent, path:"home/accommodationDetails"},
  {component: ViewAccommodationsComponent, path:"home/accommodations"},
  {component: LoginComponent, path:"logIn"},
  {component: RegistrationComponent, path:"signIn"},
  {component: AccountManagementComponent, path:"myAccount"},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",component:HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
