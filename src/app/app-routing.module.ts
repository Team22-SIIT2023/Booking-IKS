import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewAccommodationsComponent} from "./accommodations/view-accommodations/view-accommodations.component";
import {HeaderComponent} from "./layout/header/header.component";
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";
import {HomeComponent} from "./layout/home/home.component";
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { AccountManagementComponent } from './account/account-management/account-management.component';
import { CommentsAndGradesCardsComponent } from './administrator/comments-and-grades-cards/comments-and-grades-cards.component';
import { ReportedUserCardsComponent } from './administrator/reported-user-cards/reported-user-cards.component';
import { AccommodationApprovalCardsComponent } from './administrator/accommodation-approval-cards/accommodation-approval-cards.component';
import {CreateAccommodationComponent} from "./accommodations/create-accommodation/create-accommodation.component";
import {EditAccommodationsDatesComponent} from "./accommodations/edit-accommodations-dates/edit-accommodations-dates.component";
import {AccommodationComponent} from "./accommodations/accommodation/accommodation.component";
import {ReservationComponent} from "./reservations/tabsView/reservation.component";


const routes: Routes = [
  {component: AccommodationDetailsComponent, path:"home/accommodations/accommodationDetails/:id"},
  {component: AccommodationDetailsComponent, path:"accommodationApproval/accommodationDetails/:id"},
  {component: AccommodationComponent, path:"accommodation"},
  {component: ViewAccommodationsComponent, path:"home/accommodations"},
  {component: CreateAccommodationComponent, path:"create"},
  {component: EditAccommodationsDatesComponent, path:"editDates"},
  {component: AccommodationDetailsComponent, path:"reservations/accommodationDetails/:id"},
  {component: ReservationComponent, path:"reservations"},
  {component: LoginComponent, path:"logIn"},
  {component: RegistrationComponent, path:"signIn"},
  {component: AccountManagementComponent, path:"myAccount"},
  {component: CommentsAndGradesCardsComponent, path:'commentsAndRatings'},
  {component: ReportedUserCardsComponent, path:'reportedUsers'},
  {component: AccommodationApprovalCardsComponent, path:'accommodationApproval'},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
