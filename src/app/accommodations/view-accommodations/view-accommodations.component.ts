import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../accommodation/model/model.module";
import {AccommodationsService} from "../accommodations.service";

@Component({
  selector: 'app-view-accommodations',
  templateUrl: './view-accommodations.component.html',
  styleUrls: ['./view-accommodations.component.css']
})
export class ViewAccommodationsComponent implements  OnInit{

  clickedAccommodation:number|undefined
  accommodations: Accommodation[] = []
  constructor(private service: AccommodationsService) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data
      },
      error: (_) => {console.log("Greska!")}
    })
  }
  onAccommodationClicked(accommodation:Accommodation){
    this.clickedAccommodation=accommodation.id;

  }
}
