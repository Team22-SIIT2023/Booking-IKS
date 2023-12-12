import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Accommodation, AccommodationType, Amenity, TimeSlot} from "../accommodation/model/model.module";
import {AccommodationsService} from "../accommodations.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe, formatDate} from "@angular/common";
import {AmenitiesService} from "../../amenities/amenities.service";
import {MatOption} from "@angular/material/core";
import {DataService} from "../data.service";

@Component({
  selector: 'app-view-accommodations',
  templateUrl: './view-accommodations.component.html',
  styleUrls: ['./view-accommodations.component.css']
})
export class ViewAccommodationsComponent implements  OnInit{

  clickedAccommodation:number|undefined
  accommodations: Accommodation[] = []
  startDate: Date | undefined;
  endDate: Date | undefined ;
  guestNum: number | undefined;
  timeSlot: TimeSlot | undefined;
  finalPrice: number | undefined;
  minValue=5000;
  maxValue=20000;
  @ViewChildren(MatOption) options: QueryList<MatOption> | undefined;
  filterFrom = new FormGroup({
    destination: new FormControl(),
    accommodationType: new FormControl(),
    guestNum:new FormControl(),
    minValue:new FormControl(),
    maxValue:new FormControl()
  });
  // @ts-ignore
  priceForm:FormGroup;
  amenities: Amenity[]=[];
  selectedAmenities:string[]=[];
  constructor(private service: AccommodationsService,private dataService: DataService,
              private amenityService:AmenitiesService,private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.priceForm = this.fb.group({
      minValue: 5000,
      maxValue: 20000
    });
    this.service.getAll().subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data
      },
      error: (_) => {console.log("Greska!")}
    })
    this.amenityService.getAll().subscribe({
      next:(data:Amenity[]) => {
       this.amenities=data;
    },
      error:(_)=>{console.log("Greska!")}
    })

  }
  onAccommodationClicked(accommodation:Accommodation){
    this.clickedAccommodation=accommodation.id;

  }
  search(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    const destination = this.filterFrom.value.destination;
    const accommodationType=<AccommodationType>this.filterFrom.value.accommodationType;
    const guestNumber=<number>this.filterFrom.value.guestNum;

    this.service.getAll(destination,accommodationType,guestNumber,
      this.startDate,this.endDate,this.selectedAmenities,this.minValue,this.maxValue).subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data
        this.calculateTotalPrice(dateRangeStart,dateRangeEnd);
      },
      error: (_) => {console.log("Greska!")}
    })

  }

  // getFormattedDate(date: Date, format: string):string|null {
  //   const datePipe : DatePipe = new DatePipe('en-US');
  //   return datePipe.transform(date, format);
  // }
    getFormattedDate(date: Date): Date {
        const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
        return new Date(formattedDate);
    }

  dateRangeChanged(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // @ts-ignore
    this.startDate = this.getFormattedDate(new Date(dateRangeStart.value))
    // @ts-ignore
    this.endDate = this.getFormattedDate(new Date(dateRangeEnd.value))

  }

  calculateTotalPrice(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // @ts-ignore
    const selectedValue = this.filterFrom.get('guestNum').value;

    if(selectedValue && dateRangeEnd!=null && dateRangeStart!=null) {
      this.setValues(dateRangeStart, dateRangeEnd);
      const timeDifference = this.getFormattedDate(new Date(dateRangeEnd.value)).getTime() - this.getFormattedDate(new Date(dateRangeStart.value)).getTime();
      const nights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      for (const accommodation of this.accommodations) {
        this.service.getAccommodationPrice(accommodation.id, this.guestNum, this.startDate, this.endDate)
          .subscribe((price: number) => {
              this.finalPrice = price;
              if ( accommodation.pricePerGuest) {
                // @ts-ignore
                this.dataService.updatePrice(this.finalPrice, this.finalPrice/this.guestNum/nights);
              }else{
                // @ts-ignore
                this.dataService.updatePrice(this.finalPrice, this.finalPrice/nights);
              }
              this.dataService.updateIsPerGuest(accommodation.pricePerGuest);
            },
            (error) => {
              console.error('Error fetching average rating:', error);
            });

      }
    }


  }
  private setValues(dateRangeStart: HTMLInputElement,dateRangeEnd:HTMLInputElement) {
    // @ts-ignore
    const selectedValue = this.filterFrom.get('guestNum').value;
    // @ts-ignore
    const selectedOption = this.options.find(option => option.value === selectedValue);
    // @ts-ignore
    const stringValue: string = selectedOption.viewValue;
    this.guestNum = parseInt(stringValue, 10);

    this.timeSlot= {
      // @ts-ignore
      startDate:this.getFormattedDate(new Date(dateRangeStart.value)),
      // @ts-ignore
      endDate: this.getFormattedDate(new Date(dateRangeEnd.value)),
    };
  }

  onChange(amenity: String) {
    // @ts-ignore
    if (this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities = this.
        selectedAmenities.filter((item) => item !== amenity);
    } else {
      // @ts-ignore
      this.selectedAmenities.push(amenity);
    }
    console.log(this.selectedAmenities);

  }

  sliderChanges() {
    // @ts-ignore
    this.minValue = this.priceForm.value.minValue;
    // @ts-ignore
    this.maxValue =this.priceForm.value.maxValue;

  }
}
