import {Component, Host} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";
import {AccommodationsModule} from "../accommodations.module";
import {
  Amenity,
  Address,
  CreateAccommodation,
  PriceListItem,
  TimeSlot, AccommodationType
} from "../accommodation/model/model.module";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  events: string[] = [];
  selectedAmenities: string[] = [];
  startDate: string = "";
  endDate: string = "";

  allAmenities: string[] = ["wifi", "pool", "parking", "gym", "breakfast", "air conditioning",
    "pet friendly", "kitchen", "tv", "balcony", "spa", "laundry", "conference room", "bar"]


  createAccommodationForm = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    country: new FormControl(),
    address: new FormControl(),
    description: new FormControl(),
    minGuests: new FormControl(),
    maxGuests: new FormControl(),
    price: new FormControl(),
    deadline: new FormControl(),
    checkPrice: new FormControl(),
    checkReservation: new FormControl(),
    selectType: new FormControl()
  });

  constructor(private accommodationService: AccommodationsService, private router: Router) {}

  ngOnInit(): void {}

  create() {

    let date;
    if (this.createAccommodationForm.valid) {
      const address: Address = {
        city: this.createAccommodationForm.value.city,
        country: this.createAccommodationForm.value.country,
        address: this.createAccommodationForm.value.address,
      };
      const amenitiesList: Amenity[] = []
      for (var am of this.selectedAmenities) {
        const amenity: Amenity = {
          name: am,
        };
        amenitiesList.push(amenity);
      }


      const timeslots: TimeSlot[] = []
      const timeSlot: TimeSlot = {
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      };
      timeslots.push(timeSlot);

      const pricelist: PriceListItem[] = [];
      const pricelistItem: PriceListItem = {
        price: this.createAccommodationForm.value.price,
        timeSlot: timeSlot
      }
      pricelist.push(pricelistItem);

      const accommodation: CreateAccommodation = {
        name: this.createAccommodationForm.value.name,
        description: this.createAccommodationForm.value.description,
        address: address,
        minGuests: this.createAccommodationForm.value.minGuests,
        maxGuests: this.createAccommodationForm.value.maxGuests,
        type: <AccommodationType> this.createAccommodationForm.value.selectType,
        pricePerGuest: this.createAccommodationForm.value.checkPrice,
        automaticConfirmation: this.createAccommodationForm.value.checkReservation,
        hostId: Host(),
        reservationDeadline: this.createAccommodationForm.value.deadline,
        amenities: amenitiesList,
        freeTimeSlots: timeslots,
        priceList: pricelist
      };
      console.log("checkeeed ", timeSlot.endDate);


      this.accommodationService.add(accommodation).subscribe(
        {
          next: (data: CreateAccommodation) => {
            // alert(data);
          },
          error: (_) => {
          }
        }
      );
    }
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

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.events.push(`${type}: ${event.value}`);
  //   // this.startDate = new Date(`${type}: ${event.value}`)
  // }
  onChange(amenity: string) {
    this.selectedAmenities.push(amenity)
  }

  getFormatedDate(date: Date, format: string):string|null {
    const datePipe : DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  dateRangeChanged(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // @ts-ignore
    this.startDate = this.getFormatedDate(new Date(dateRangeStart.value), "yyyy-MM-dd")
    // @ts-ignore
    this.endDate = this.getFormatedDate(new Date(dateRangeEnd.value), "yyyy-MM-dd")
  }
}
