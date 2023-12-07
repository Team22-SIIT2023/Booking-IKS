import {Component, Host} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AccommodationsService} from "../accommodations.service";
import {Router} from "@angular/router";
import {
  EditAccommodation,
  PriceListItem,
  TimeSlot
} from "../accommodation/model/model.module";

@Component({
  selector: 'app-edit-accommodations-dates',
  templateUrl: './edit-accommodations-dates.component.html',
  styleUrls: ['./edit-accommodations-dates.component.css']
})

export class EditAccommodationsDatesComponent {
  createAccommodationForm = new FormGroup({
    price: new FormControl(),
    deadline: new FormControl(),
    checkPrice: new FormControl(),
    checkReservation: new FormControl(),
  });

  constructor(private accommodationService: AccommodationsService, private router: Router) {}

  ngOnInit(): void {}

  edit() {
    let date;
    if (this.createAccommodationForm.valid) {
      const timeslots: TimeSlot[] = []
      const timeSlot: TimeSlot = {
        startDate: new Date("2024-01-16"),
        endDate: new Date("2024-01-19")
      };
      timeslots.push(timeSlot);

      const pricelist: PriceListItem[] = [];
      const pricelistItem: PriceListItem = {
        price: this.createAccommodationForm.value.price,
        timeSlot: timeSlot
      }
      pricelist.push(pricelistItem);

      const accommodation: EditAccommodation = {
        pricePerGuest: this.createAccommodationForm.value.checkPrice,
        automaticConfirmation: this.createAccommodationForm.value.checkReservation,
        reservationDeadline: this.createAccommodationForm.value.deadline,
        freeTimeSlots: timeslots,
        priceList: pricelist
      };


      this.accommodationService.update(accommodation).subscribe(
        {
          next: (data: EditAccommodation) => {
            // alert(data);
          },
          error: (_) => {
          }
        }
      );
    }
  }
}
