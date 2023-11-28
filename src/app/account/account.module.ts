import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AccountManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegistrationComponent,
    AccountManagementComponent
  ]

})

export class AccountModule { }