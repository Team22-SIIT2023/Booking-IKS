import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";
import {Accommodation} from "../accommodation/model/model.module";
//import Array from "$GLOBAL$";
// import Date from "$GLOBAL$";
// import Date from "$GLOBAL$";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit{
  protected readonly Array = Array;
  accommodation:Accommodation|undefined;

  constructor(private root:ActivatedRoute,private acommodationsService:AccommodationsService) {
  }

  ngOnInit(): void {
    this.root.params.subscribe((params) =>{
      const id=+params['id']
      this.acommodationsService.getAccommodation(id).subscribe({
        next:(data:Accommodation)=>{this.accommodation=data}
      })
      }
    )
  }
}
