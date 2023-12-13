import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Account, Address, Role, Status, User} from "../model/model.module";

// import { FormControl, Validators } from '@angular/forms';

interface MemberType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
  })

export class RegistrationComponent implements OnInit {
  selectedValue: string = 'GUEST';

  constructor(
    private fb: FormBuilder,
    private authenticationService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const password = control.get('password')?.value;
  //   console.log(password);
  //   const confirmPassword = control.get('confirmPassword')?.value;
  //
  //   return password === confirmPassword ? null : { 'passwordMismatch': true };
  // };

  registrationForm = this.fb.group({
    username : [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    address: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    role: [null, [Validators.required]]
  });

  ngOnInit(): void {
  }

  submit() {

    if (this.registrationForm.valid) {
      console.log("usao :)")

    const newRole : Role = {
      // @ts-ignore
      name: this.registrationForm.value.role
    }

    const newAccount : Account = {
      // @ts-ignore
      username: this.registrationForm.value.username,
      // @ts-ignore
      password: this.registrationForm.value.password,
      // @ts-ignore
      role: newRole,
      status: Status.PENDING
    }

    const newAddress : Address = {
      // @ts-ignore
      address:this.registrationForm.value.address
    }


    const auth: User = {
      // @ts-ignore
      firstName: this.registrationForm.value.firstName,
      // @ts-ignore
      lastName: this.registrationForm.value.lastName,
      // @ts-ignore
      phoneNumber: this.registrationForm.value.phoneNumber,
      address: newAddress,
      account: newAccount,
      lastPasswordResetDate: new Date()
    }

    this.authenticationService.signup(auth).subscribe(
      result => {
        // this.toastr.success('Successful login!');
        // localStorage.setItem('user', JSON.stringify(result));
      },
      error => {
        this.toastr.error(error.error);
      }
    );

    this.authenticationService.sendEmail(auth).subscribe(
      result => {
        // this.toastr.success('Successful login!');
        // localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['logIn']);
      },
      error => {
        this.toastr.error(error.error);
      }
    );
  }
  }
}
