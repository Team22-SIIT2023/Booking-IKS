import { Component } from '@angular/core';
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

export class RegistrationComponent {
  selectedValue: string = 'option1';
}
