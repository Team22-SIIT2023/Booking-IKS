import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Accommodation, AccommodationType, Amenity, TimeSlot} from "../accommodation/model/model.module";
import {AccommodationsService} from "../accommodations.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe, formatDate} from "@angular/common";
import {AmenitiesService} from "../../amenities/amenities.service";
import {MatOption} from "@angular/material/core";
import {DataService} from "../data.service";
import {MatCheckbox} from "@angular/material/checkbox";

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
  country:string=""
  city:string=""
  minValueView=5000;
  maxValueView=20000;
  minValue=5000;
  maxValue=20000;
  @ViewChildren(MatOption) options: QueryList<MatOption> | undefined;
  @ViewChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox> | undefined;
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
  typeOptions: string[]=[];
  constructor(private service: AccommodationsService,private dataService: DataService,
              private amenityService:AmenitiesService,private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.typeOptions=Object.values(AccommodationType).map(item => String(item));
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
    if(destination){
      const destArray=destination.split(",");
      if(destArray.length>1){
        this.country=destArray[0];
        this.city=destArray[1];
      }else{
        this.country=destination;
    }

    }
    const accommodationType=<AccommodationType>this.filterFrom.value.accommodationType;
    const guestNumber=this.filterFrom.value.guestNum;
    if(!this.priceForm.enabled){
      this.minValue=0;
      this.maxValue=0;
    }else{
      this.minValue=this.minValueView;
      this.maxValue=this.maxValueView;
    }
    this.service.getAll(this.country,this.city,accommodationType,guestNumber,
      this.startDate,this.endDate,this.selectedAmenities,this.minValue,this.maxValue).subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data
        this.calculateTotalPrice(dateRangeStart,dateRangeEnd);
      },
      error: (_) => {console.log("Greska!")}
    })

  }

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
    const selectedValue = this.filterFrom.value.guestNum;

    if(selectedValue && dateRangeEnd.value!="" && dateRangeStart.value!="") {
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
    this.guestNum  = this.filterFrom.value.guestNum;

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
    this.minValueView = this.priceForm.value.minValue;
    // @ts-ignore
    this.maxValueView =this.priceForm.value.maxValue;

  }
  clearFilters() {
    this.filterFrom.reset();
    // @ts-ignore
    this.checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  disablePrice() {
    if (this.priceForm.enabled) {
      this.priceForm.disable();
    } else {
      this.priceForm.enable();
    }
  }
}
