import {Component, OnInit} from '@angular/core';
import {Accommodation, FavoriteAccommodations} from "../../accommodations/accommodation/model/model.module";
import {AccommodationsService} from "../../accommodations/accommodations.service";
import {FavoritesService} from "./favorites.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent implements OnInit{

  clickedAccommodation:number|undefined
  accommodations: Accommodation[] = []
  constructor(private service: FavoritesService,private accService:AccommodationsService) {
  }

  ngOnInit(): void {
    this.service.getAllforGuest().subscribe({
      next: (favoriteAccommodations: FavoriteAccommodations[]) => {

        const accommodationIds = favoriteAccommodations.map(favoriteAccommodation =>
          favoriteAccommodation.accommodationId
        );
        const accommodationRequests = accommodationIds.map(accommodationId =>
          this.accService.getAccommodation(accommodationId)
        );

        forkJoin(accommodationRequests).subscribe({
          next: (accommodations: Accommodation[]) => {
            this.accommodations = accommodations;
          },
          error: (_) => {
            console.log("Error fetching Accommodations");
          },
        });
      },
      error: (_) => {
        console.log("Error fetching data from FavoritesService");
      },
    });
  }


  onAccommodationClicked(accommodation:Accommodation){
    this.clickedAccommodation=accommodation.id;

  }

}
