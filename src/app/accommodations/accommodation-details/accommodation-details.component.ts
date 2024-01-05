import {Component, Host, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";

import {
  Accommodation,
  AccommodationType,
  RequestStatus,
  ReservationRequest,
  TimeSlot
} from "../accommodation/model/model.module";
import {ReservationsService} from "../../reservations/reservations.service";
import {formatDate} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {Observable, range, toArray} from "rxjs";
import {transformMenu} from "@angular/material/menu";
import {CommentAndGrade, Guest} from "../../administrator/comments-and-grades/model/model.module";
import {CommentsService} from "../../comments/comments.service";
import {MapService} from "../../map/map.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../account/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Status} from "../../account/model/model.module";
// import { Host } from "src/app/account/model/model.module";


@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit{
  @Input() maxRatingHost =5;
  @Input() SelectedStarHost=0;
  @Input() maxRatingAccommodation =5;
  @Input() SelectedStarAccommodation=0;
  maxRatingArrAccommodation=[];
  previouseSelectedAccommodation = 0;
  maxRatingArrHost=[];
  previouseSelectedHost = 0;

  hostComment: string = '';
  accommodationComment: string = '';
  hostAverageRating:number;


  protected readonly Array = Array;
  accommodation:Accommodation;
  numberOptions: Observable<number[]>;
  @ViewChildren(MatOption) options: QueryList<MatOption>;
  availableDateRanges: { start: Date, end: Date }[] = [];
  timeSlot: TimeSlot;
  guestNum: number;
  price:number=0;
  comments: CommentAndGrade[] = [];
  address: string;
  images: string[] = [];
  role: string = '';
  guest:Guest;

  form:FormGroup=new FormGroup({
        numberSelect:new FormControl(),
        priceInput:new FormControl(),
    });
  approvalType: FormGroup=new FormGroup({
    approvalTypeRbt:new FormControl()
  });

  constructor(private root:ActivatedRoute,private acommodationsService:AccommodationsService,
              private reservationService:ReservationsService,
              private commentService:CommentsService, private mapService:MapService,
              private sanitizer: DomSanitizer,private userService:UserService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
      const guestId=this.userService.getUserId();
      this.userService.getUser(guestId).subscribe(
          (data) => {
              this.guest=data;
              console.log(this.guest)
          },
          (error) => {
              console.error('Error fetching guest:', error);
          });


    // @ts-ignore
    this.maxRatingArrHost = Array(this.maxRatingHost).fill(0);

    // @ts-ignore
    this.maxRatingArrAccommodation = Array(this.maxRatingAccommodation).fill(0);

    this.userService.userState.subscribe((result) => {
      this.role = result;
    });
    this.root.params.subscribe((params) =>{
      const id=+params['id']
      this.acommodationsService.getAccommodation(id).subscribe({
        next:(data:Accommodation)=>{
          this.accommodation=data;
          this.address=this.accommodation.address?.address+','+
                this.accommodation.address?.city;
          const min=this.accommodation.minGuests;
          const max=this.accommodation.maxGuests;
          if (min != null && max!=null) {
            this.numberOptions=range(min,max+1-min).pipe(toArray());
          }
            const timeSlots=this.accommodation?.freeTimeSlots;
            if(timeSlots){
                timeSlots.forEach(timeSlot => {
                    this.availableDateRanges.push({ start: timeSlot.startDate, end: timeSlot.endDate });
                });
            }
          this.commentService.getAllForAccommodation(this.accommodation?.id).subscribe({
            next: (data: CommentAndGrade[]) => {
              this.comments = data
            },
            error: (_) => {console.log("Greska!")}
          })
          this.acommodationsService.getImages(this.accommodation.id).subscribe(
            (images) => {
              this.images = images;
            },
            (error) => {
              console.error('Error fetching images:', error);
            }
          );

        this.commentService.getAverageHostRating(this.accommodation.host.id)
            .subscribe(
                (averageRating: number) => {
                    this.hostAverageRating = averageRating;
                },
                (error) => {
                    console.error('Error fetching average rating:', error);
                }
            );

        const initialApprovalType = this.accommodation.automaticConfirmation ? 'automatic' : 'manual';
        this.approvalType.patchValue({
          approvalTypeRbt: initialApprovalType
        });
        }
      })
      })
  }

  decodeBase64AndSanitize(image: string): string {
    const decodedImage = atob(image);
    const blob = new Blob([new Uint8Array([...decodedImage].map(char => char.charCodeAt(0)))], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl) as string;
  }

    dateFilter = (date: Date): boolean => {
        return this.isDateInAvailableRange(date);
    };
    isDateInAvailableRange(date: Date): boolean {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (date < currentDate) {
        return false;
      }
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

    if(dateRangeStart.value && dateRangeEnd.value && this.form.value.numberSelect){

        this.setValues(dateRangeStart, dateRangeEnd);

        const price = this.form.value.priceInput;
        const request: ReservationRequest={
          timeSlot: this.timeSlot,
          price:price,
          guest:this.guest,
          accommodation:this.accommodation,
          status:RequestStatus.PENDING,
          guestNumber:this.guestNum
        };
        if (price==0){
          this.snackBar.open("No prices for this date range!", 'Close', {
            duration: 3000,
          });
        }
        else {
          this.reservationService.add(request).subscribe(
            {
              next: (data: ReservationRequest) => {
                this.snackBar.open("Request created!", 'Close', {
                  duration: 3000,
                });
              },
              error: (_) => {
              }
            });
        }
      }else {
              this.snackBar.open("Select date range and guest number!", 'Close', {
                duration: 3000,
              });
    }
  }

  protected readonly transformMenu = transformMenu;


  calculateTotalPrice(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {

      const selectedValue = this.form.value.numberSelect;

      if(selectedValue && dateRangeEnd.value && dateRangeStart.value){
          this.setValues(dateRangeStart, dateRangeEnd);

          const timeDifference = this.getFormattedDate(new Date(dateRangeEnd.value)).getTime() - this.getFormattedDate(new Date(dateRangeStart.value)).getTime();
          const nights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


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

      const selectedValue = this.form.value.numberSelect;
      const selectedOption = this.options.find(option => option.value === selectedValue);
      if(selectedOption){
        const stringValue: string = selectedOption.viewValue;
        this.guestNum = parseInt(stringValue, 10);
      }
       this.timeSlot= {
          startDate:this.getFormattedDate(new Date(dateRangeStart.value)),
          endDate: this.getFormattedDate(new Date(dateRangeEnd.value)),
      };
      const guestId=this.userService.getUserId();



        //ovo ne moraaaaaa!
      this.userService.getUser(guestId).subscribe(
      (data) => {
        this.guest=data;
      },
      (error) => {
        console.error('Error fetching guest:', error);
      });
  }

  protected readonly Host = Host;

  HandleMouseEnterHost(index:number){
    this.SelectedStarHost=index+1;
  }

  HandleMouseEnterAccommodation(index:number){
    this.SelectedStarAccommodation=index+1;
  }


  HandeMouseLeaveHost() {
    if (this.previouseSelectedHost!==0){
      this.SelectedStarHost = this.previouseSelectedHost;
   }
  }

//   HandeMouseLeave() {
//     if (this.previousSelected!==0){
//       this.SelectedStar = this.previousSelected;
//     }
//     else{ this.SelectedStarHost=0; }
//   }

  HandeMouseLeaveAccommodation() {
    if (this.previouseSelectedAccommodation!==0){
      this.SelectedStarAccommodation = this.previouseSelectedAccommodation;
    }
    else{ this.SelectedStarAccommodation=0; }
  }

  RatingHost(index:number) {
    this.SelectedStarHost=index+1;
    this.previouseSelectedHost=this.SelectedStarHost;
  }

  RatingAccommodation(index:number) {
      this.SelectedStarAccommodation=index+1;
      this.previouseSelectedAccommodation=this.SelectedStarAccommodation;
  }

//   Rating(index:number) {
//     this.SelectedStar=index+1;
//     this.previousSelected=this.SelectedStar;
//   }


  commentHost() {

    let rate=this.SelectedStarHost;
    let comment = this.hostComment;

    console.log(this.accommodation.host.id);

    const commentAndGrade : CommentAndGrade = {
        text: comment,
        rating: rate,
        date: new Date(),
        status: Status.PENDING,
        guest:this.guest,
    }

    this.commentService.createHostComment(this.accommodation.host.id, commentAndGrade).subscribe({
      next: (data: CommentAndGrade) => {
        this.snackBar.open("Comment is created", 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
          if (err.status===400) {
              console.log(err);
            this.snackBar.open("You can't comment on the host", 'Close', {
              duration: 3000,
            });
          }
      }
    })
  }

  commentAccommodation() {

      let rate=this.SelectedStarAccommodation;
      let comment = this.accommodationComment;

      console.log(this.accommodation.host.id);

      const commentAndGrade : CommentAndGrade = {
          text: comment,
          rating: rate,
          date: new Date(),
          status: Status.PENDING,
          guest:this.guest,
      }

      this.commentService.createAccommodationComment(this.accommodation.id, commentAndGrade).subscribe({
          next: (data: CommentAndGrade) => {
            this.snackBar.open("Comment is created", 'Close', {
              duration: 3000,
            });
          },
          error: (err) => {
              if (err.status===400) {
                  console.log(err);
                  this.snackBar.open("You can't comment on the accommodation", 'Close', {
                    duration: 3000,
                  });
              }
              console.log("Greska");
          }
      })
    }

    public reportHost() {
        this.userService.reportHost(this.guest.id, this.accommodation.host).subscribe(
        (data) => {
          console.log(data)
          this.snackBar.open("Host has been reported", 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open("You can't report the host", 'Close', {
            duration: 3000,
          });
        });
    }

    getHostStarColor(starIndex: number): string {
        return starIndex <= this.hostAverageRating ? 'filled-star' : 'empty-star';
    }

  changeApprovalType() {
    const selectedValue = this.approvalType.value.approvalTypeRbt;
    if(selectedValue){
      if(selectedValue=="manual"){
        this.accommodation.automaticConfirmation=false;
      }else{
        this.accommodation.automaticConfirmation=true;
      }
      this.updateAccommodation();
    }
  }

  updateAccommodation(){
    this.acommodationsService.update(this.accommodation).subscribe(
      {
        next: (data: Accommodation) => {
          this.accommodation = data;
        },
        error: (_) => {
        }
      }
    );

  }
}
