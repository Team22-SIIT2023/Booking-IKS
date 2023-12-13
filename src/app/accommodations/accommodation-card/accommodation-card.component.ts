import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation, Address, Amenity} from "../accommodation/model/model.module";
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {CommentsService} from "../../comments/comments.service";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  currentPrice: number | undefined;
  unitPrice: number | undefined;
  unitText: string |undefined;
  rating: number = 0;
  private subscription: Subscription | undefined;
  @Input()
  accommodation: Accommodation | undefined;
  @Output()
  clicked:EventEmitter<Accommodation>=new EventEmitter<Accommodation>();


  constructor(private dataService: DataService, private commentService:CommentsService) {}

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
  }
  ngOnDestroy() {
    // @ts-ignore
    this.subscription.unsubscribe();
  }
  onAccommodationClicked():void{
    this.clicked.emit(this.accommodation);
  }

    protected readonly Array = Array;


  getStarColor(starIndex: number): string {
    // @ts-ignore
    return starIndex <= this.rating ? 'filled-star' : 'empty-star';
  }
}
