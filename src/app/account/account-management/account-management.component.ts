import { Component, OnInit } from '@angular/core';
import {UserService} from "../account.service";
import { Account,Address, User } from "../model/model.module";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  
  user: User | undefined;
  account: Account | undefined;
  address: Address | undefined;
  constructor(private service: UserService) {
  }


  ngOnInit(): void {
    this.service.getUser(1).subscribe({
      next: (data: User) => {
        this.user = data;
        // this.address = data.address;
        // this.account = data.account;
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  url: string|null|ArrayBuffer = '../../../assets/images/addpicture.png' 
  
  onFileSelected(files: FileList | null) {
      if (files) {
          var reader = new FileReader()
          reader.readAsDataURL(files[0])
          reader.onload = (event:Event) => {
            let fileReader = event.target as FileReader
            this.url = fileReader.result;
          }
      }
    }
}
