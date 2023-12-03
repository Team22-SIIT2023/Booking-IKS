import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../accommodations/accommodation/model/model.module";
import {AccommodationsService} from "../../accommodations/accommodations.service";

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent implements OnInit{

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
