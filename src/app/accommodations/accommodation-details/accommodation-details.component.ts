import {
    Component,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";
import * as L from 'leaflet';

import {
    Accommodation,
    RequestStatus,
    ReservationRequest,
    TimeSlot
} from "../accommodation/model/model.module";
import {ReservationsService} from "../../reservations/reservations.service";
import {formatDate, Time} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {Observable, range, toArray} from "rxjs";
import {transformMenu} from "@angular/material/menu";
import {CommentAndGrade} from "../../administrator/comments-and-grades/model/model.module";
import {CommentsService} from "../../comments/comments.service";
import {MapService} from "../../map/map.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit{
  protected readonly Array = Array;
  accommodation:Accommodation| undefined;
  numberOptions: Observable<number[]> | undefined;
  @ViewChildren(MatOption) options: QueryList<MatOption> | undefined;
  availableDateRanges: { start: Date, end: Date }[] = [];
  timeSlot: TimeSlot | undefined;
  guestNum: number | undefined;
  price:number=0;
  comments: CommentAndGrade[] = [];
  address: string | undefined;

  form:FormGroup=new FormGroup({
        numberSelect:new FormControl(),
        priceInput:new FormControl()
    });

  constructor(private root:ActivatedRoute,private acommodationsService:AccommodationsService,
              private reservationService:ReservationsService,
              private commentService:CommentsService, private mapService:MapService) {
  }

  ngOnInit(): void {
    this.root.params.subscribe((params) =>{
      const id=+params['id']
      this.acommodationsService.getAccommodation(id).subscribe({
        next:(data:Accommodation)=>{
          this.accommodation=data;
          // @ts-ignore
            this.address=this.accommodation.address?.address+','+
                this.accommodation.address?.city;
          const min=this.accommodation?.minGuests;
          const max=this.accommodation?.maxGuests;
          if (min != null) {
            // @ts-ignore
            this.numberOptions=range(min,max+1-min).pipe(toArray());
          }
            const timeSlots=this.accommodation?.freeTimeSlots;
            if(timeSlots){
                timeSlots.forEach(timeSlot => {
                    // @ts-ignore
                    this.availableDateRanges.push({ start: timeSlot.startDate, end: timeSlot.endDate });
                });
            }
          this.commentService.getAllForAccommodation(this.accommodation?.id).subscribe({
            next: (data: CommentAndGrade[]) => {
              this.comments = data
            },
            error: (_) => {console.log("Greska!")}
          })
        }
      })
      }

    )

  }
    dateFilter = (date: Date): boolean => {
        return this.isDateInAvailableRange(date);
    };
    isDateInAvailableRange(date: Date): boolean {
        for (const range of this.availableDateRanges) {
            const startDate = new Date(range.start);
            const endDate = new Date(range.end);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            if (date >= startDate && date <= endDate) {
                return true;
            }
        }
        return false;
    }
    getFormattedDate(date: Date): Date {
        const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
        return new Date(formattedDate);
    }

  createReservation(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {

      // @ts-ignore
      this.setValues(dateRangeStart, dateRangeEnd);
      // @ts-ignore
      const price = this.form.get('priceInput').value;
        const request: ReservationRequest={
            timeSlot: this.timeSlot,
            price:price,
            // @ts-ignore
            accommodation:this.accommodation,
            status:RequestStatus.WAITING,
            guestNumber:this.guestNum
        };
        if (this.form.value.priceInput==0){
          console.log("No price for this date range");
        }
      else {
          this.reservationService.add(request).subscribe(
            {
              next: (data: ReservationRequest) => {
              },
              error: (_) => {
              }
            }
          );
        }
  }

  protected readonly transformMenu = transformMenu;


    calculateTotalPrice(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
        // @ts-ignore
        const selectedValue = this.form.get('numberSelect').value;

        if(selectedValue && dateRangeEnd!=null && dateRangeStart!=null){
            this.setValues(dateRangeStart, dateRangeEnd);

            const timeDifference = this.getFormattedDate(new Date(dateRangeEnd.value)).getTime() - this.getFormattedDate(new Date(dateRangeStart.value)).getTime();
            const nights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

          // @ts-ignore
          this.acommodationsService.getAccommodationPrice(this.accommodation.id, this.guestNum, this.timeSlot?.startDate, this.timeSlot?.endDate)
            .subscribe((price: number) => {
                this.price = price;
                this.form.patchValue({
                  priceInput: price !== null ? price : ''
                });
              },
              (error) => {
                console.error('Error:', error);
              });

        }

    }

    private setValues(dateRangeStart: HTMLInputElement,dateRangeEnd:HTMLInputElement) {
        // @ts-ignore
        const selectedValue = this.form.get('numberSelect').value;
        // @ts-ignore
        const selectedOption = this.options.find(option => option.value === selectedValue);
        // @ts-ignore
        const stringValue: string = selectedOption.viewValue;
        this.guestNum = parseInt(stringValue, 10);

         this.timeSlot= {
            startDate:this.getFormattedDate(new Date(dateRangeStart.value)),
            endDate: this.getFormattedDate(new Date(dateRangeEnd.value)),
        };

    }
}
