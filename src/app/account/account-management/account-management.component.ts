import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  
  constructor(){};
  ngOnInit() {
    
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
