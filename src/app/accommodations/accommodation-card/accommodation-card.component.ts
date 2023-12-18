import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation, Address, Amenity} from "../accommodation/model/model.module";
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {CommentsService} from "../../comments/comments.service";
import {AccommodationsService} from "../accommodations.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  currentPrice: number;
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


  constructor(private dataService: DataService, private commentService:CommentsService,
              private accommodationService:AccommodationsService,private sanitizer:DomSanitizer) {}


  ngOnInit() {

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

}
