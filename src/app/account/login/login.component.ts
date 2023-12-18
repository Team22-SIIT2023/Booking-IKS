import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {UserService} from "../account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authenticationService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}


  form = this.fb.group({
    username : [null, [Validators.required]],
    password: [null, [Validators.required]]
  });



  ngOnInit() {
  }

  submit() {
    const auth: any = {};
    auth.username = this.form.value.username;
    auth.password = this.form.value.password;

    this.authenticationService.login(auth).subscribe(
      result => {
        console.log("VANJAAAAAAAAAAAAAAAAAAAAAAAAA")
        this.toastr.success('Successful login!');
        localStorage.setItem('user', JSON.stringify(result));
        this.authenticationService.setUser()
        this.router.navigate(['home']);
      },
      error => {
        this.toastr.error(error.error);
      }
    );
  }

}
