import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementComponent } from './account-management.component';
import { By } from '@angular/platform-browser';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../account.service";

describe('AccountManagementComponent', () => {
  let component: AccountManagementComponent;
  let fixture: ComponentFixture<AccountManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementComponent],
      providers: [UserService],
      imports: [HttpClientTestingModule,MaterialModule,BrowserAnimationsModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(AccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('all invalid fields', () => {
    component.updateUserForm.controls['firstName'].setValue('');
    component.updateUserForm.controls['lastName'].setValue('');
    component.updateUserForm.controls['country'].setValue('');
    component.updateUserForm.controls['city'].setValue('');
    component.updateUserForm.controls['address'].setValue('');
    component.updateUserForm.controls['phoneNumber'].setValue('');
    component.updateUserForm.controls['username'].setValue('');
    component.updateUserForm.controls['password'].setValue('');
    component.updateUserForm.controls['confirmPassword'].setValue('');
    component.updateUserForm.controls['phoneNumber'].setValue('');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('first name empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimmitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('11238716');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });


  it('first name length less then 3', () => {
    component.updateUserForm.controls['firstName'].setValue('is');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimmitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('11238716');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('last name empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimmitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('11238716');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });


  it('last name length less then 3', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('al');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimmitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('11238716');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('country empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimmitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('11238716');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('city empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('');
    component.updateUserForm.controls['address'].setValue('mise dimmitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('11238716');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });
  it('address empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('');
    component.updateUserForm.controls['phoneNumber'].setValue('11238716');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });
  it('phone number empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('phone number invalid format field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });


  it('username empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });


  it('username invalid format', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aaa');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });


  it('password empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });



  it('password length less then 6', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('confirm password empty field', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });



  it('confirm password length less then 6', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('password and confirm password length is the same but not the same', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra456');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('password and confirm password length less then 6 but are equals', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('dimitrijevica');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });


  it('valid', () => {
    component.updateUserForm.controls['firstName'].setValue('isidora');
    component.updateUserForm.controls['lastName'].setValue('aleksic');
    component.updateUserForm.controls['country'].setValue('srbija');
    component.updateUserForm.controls['city'].setValue('novi sad');
    component.updateUserForm.controls['address'].setValue('mise dimitrijevica');
    component.updateUserForm.controls['phoneNumber'].setValue('123456');
    component.updateUserForm.controls['username'].setValue('aleksicisidora@yahoo.com');
    component.updateUserForm.controls['password'].setValue('sifra123');
    component.updateUserForm.controls['confirmPassword'].setValue('sifra123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("#saveChanges"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });
});
