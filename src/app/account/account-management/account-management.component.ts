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
  url: string|null|ArrayBuffer = '../../../assets/images/addpicture.png' 

  constructor(private service: UserService) {
  }


  ngOnInit(): void {
    this.service.getUser(1).subscribe({
      next: (data: User) => {
        this.user = data;
        if(this.user.picturePath!=""){
          this.url=this.user.picturePath;
        }
      },
      error: (_) => {console.log("Greska!")}
    })
  }


  
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
