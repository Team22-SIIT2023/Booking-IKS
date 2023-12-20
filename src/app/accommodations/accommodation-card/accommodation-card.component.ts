import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation, Address, Amenity, RequestStatus, ReservationRequest} from "../accommodation/model/model.module";
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {CommentsService} from "../../comments/comments.service";
import {AccommodationsService} from "../accommodations.service";
import {DomSanitizer} from "@angular/platform-browser";
import { UserService } from 'src/app/account/account.service';
import { Router } from '@angular/router';
import { ReservationsService } from 'src/app/reservations/reservations.service';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {

  currentPrice: number;
  role: string;
  activeReservations:ReservationRequest[];
  unitPrice: number;
  unitText: string;
  rating: number = 0;
  images: string[] =[];
  image:string;
  private subscription: Subscription;
  @Input()
  accommodation: Accommodation;
  @Output()
  clicked:EventEmitter<Accommodation>=new EventEmitter<Accommodation>();
  reservations: any;


  constructor(private dataService: DataService, private commentService:CommentsService,
              private accommodationService:AccommodationsService,private sanitizer:DomSanitizer,
              private userService: UserService, private router:Router, private reservationService:ReservationsService) {}


  ngOnInit() {
    this.role = this.userService.getRole();
    const updateButtons = document.getElementsByClassName('updateAccommodation') as HTMLCollectionOf<HTMLButtonElement>;
    const acceptButtons = document.getElementsByClassName('acceptButton') as HTMLCollectionOf<HTMLButtonElement>;
    const declineButtons = document.getElementsByClassName('declineButton') as HTMLCollectionOf<HTMLButtonElement>;
    for (let i = 0; i < updateButtons.length; i++) {
        const updateButton = updateButtons[i];
        if (this.userService.getRole() != 'ROLE_HOST') {
            updateButton.style.visibility = 'hidden';
        }
    }
    for (let i = 0; i < acceptButtons.length; i++) {
      const acceptButton = acceptButtons[i];
      if (this.userService.getRole() != 'ROLE_ADMIN') {
          acceptButton.style.visibility = 'hidden';
      }
    }
    for (let i = 0; i < declineButtons.length; i++) {
      const declineButton = declineButtons[i];
      if (this.userService.getRole() != 'ROLE_ADMIN') {
          declineButton.style.visibility = 'hidden';
      }
    }
    
    this.subscription = this.dataService.currentPrice.subscribe(price => {
      this.currentPrice = price;
    });

    this.subscription.add(this.dataService.unitPrice.subscribe(price => {
      this.unitPrice = price;
    }));
    this.subscription?.add(this.dataService.isPerGuest.subscribe(isPerGuest => {
      if(isPerGuest){
        this.unitText=" Price per guest:"
      }else{
        this.unitText=" Accommodation price:"
      }
    }));

    // @ts-ignore
    this.commentService.getAverageAccommodationRating(this.accommodation.id)
      .subscribe(
        (averageRating: number) => {
            this.rating = averageRating;
        },
        (error) => {
          console.error('Error fetching average rating:', error);
        }
      );
    this.accommodationService.getImages(this.accommodation?.id).subscribe(
      (images) => {
        this.images = images;
        if(this.images.length>0){
          this.image=this.decodeBase64AndSanitize(this.images[0])
        }
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }
  decodeBase64AndSanitize(image: string): string {
    const decodedImage = atob(image);
    const blob = new Blob([new Uint8Array([...decodedImage].map(char => char.charCodeAt(0)))], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl) as string;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onAccommodationClicked():void{
    this.clicked.emit(this.accommodation);
  }

    protected readonly Array = Array;


  getStarColor(starIndex: number): string {
    return starIndex <= this.rating ? 'filled-star' : 'empty-star';
  }

  acceptAccommodation() {
    this.accommodationService.accept(this.accommodation).subscribe(
      {
        next: (data: Accommodation) => {
          this.accommodation = data;
          this.router.navigate(['home']);
        },
        error: (_) => {
        }
      }
    );
  }
  declineAccommodation() {
    this.accommodationService.decline(this.accommodation).subscribe(
      {
        next: (data: Accommodation) => {
          this.accommodation = data;
          this.router.navigate(['home']);
        },
        error: (_) => {
        }
      }
    );
  }


}


