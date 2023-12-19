import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from "../account.service";
import { Account, Address, Role, Status, User } from "../model/model.module";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  user: User | undefined;
  role: string ;
  url: string | null | ArrayBuffer = '../../../assets/images/addpicture.png';

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  };

  updateUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatchValidator]),
    picturePath: new FormControl('')
  });

  constructor(private service: UserService,private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const deleteButton = document.getElementById('deleteButton') as HTMLButtonElement;
    if (this.service.getRole() == 'ROLE_ADMIN') {
        deleteButton.style.visibility = 'hidden';
    }
    this.service.getUser(this.service.getUserId()).subscribe({
      next: (data: User) => {
        this.user = data;
        if (this.user.picturePath !== "") {
          if(this.user.picturePath){
          this.url = this.user.picturePath;
        }
        }
        this.updateUserForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          country: this.user.address?.country,
          city: this.user.address?.city,
          address: this.user.address?.address,
          phoneNumber: this.user.phoneNumber,
          username: this.user.account?.username,
          password: this.user.account?.password,
          confirmPassword: this.user.account?.password,
          picturePath: this.user.picturePath
        });
      },
      error: (_) => {
        console.log("Error fetching user data!");
      },
    });
  }

  onFileSelected(files: FileList | null) {
    if (files) {
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event: Event) => {
        let fileReader = event.target as FileReader
        this.url = fileReader.result;
      }
    }
  }

  updateUser() {
    if (this.updateUserForm.valid) {
      const address: Address = {
        city: this.updateUserForm.value.city as string || '',
        country: this.updateUserForm.value.country as string || '',
        address: this.updateUserForm.value.address as string || '',
      };

      console.log(this.user)

      const account: Account = {
        id: this.user?.account?.id,
        username: this.updateUserForm.value.username as string || '',
        password: this.updateUserForm.value.password as string || '',
        status: this.user?.account?.status as Status,
        roles: this.user?.account?.roles as Role[],
      };

      const updatedUser: User = {
        firstName: this.updateUserForm.value.firstName as string || '',
        lastName: this.updateUserForm.value.lastName as string || '',
        address: address,
        phoneNumber: this.updateUserForm.value.phoneNumber as string || '',
        account: account,
        id: this.user?.id as number,
        picturePath: this.updateUserForm.value.picturePath as string || '',
      };

      this.service.update(updatedUser).subscribe(
        (updatedUser) => {
          console.log('User updated successfully', updatedUser);
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    }
  }

  deleteUser() {
    this.service.delete(this.user?.id as number).subscribe(
      () => {
        console.log('User deleted successfully.');
        localStorage.removeItem('user');
        // this.toastr.success(result);
        this.router.navigate(['logIn']);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
