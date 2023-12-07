import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/account/model/model.module';
import { CommentAndGrade } from '../comments-and-grades/model/model.module';

@Component({
  selector: 'app-reported-user-card',
  templateUrl: './reported-user-card.component.html',
  styleUrls: ['./reported-user-card.component.css']
})
export class ReportedUserCardComponent {

  protected readonly Array = Array;

  @Input()
  reportedUser: User |any;

  @Output()
  clicked: EventEmitter<User> = new EventEmitter<User>();

  onReportedUserClick(): void {
    this.clicked.emit(this.reportedUser);
    
  }

  // rating = this.commentAndGrade?.rating; // Replace with your actual rating
  // rating : number = 4.2
  
  getColorForStar(index: number, rating: number): string {
    const roundedRating = Math.round(rating);
    
    if (index < roundedRating) {
      return '#FFB703'; // Fully filled star
    } else if (index === roundedRating) {
      const decimalPart = rating - roundedRating;
      return `linear-gradient(90deg, #FFB703 ${decimalPart * 100}%, grey ${decimalPart * 100}%)`; // Partially filled star
    } else {
      return 'grey'; // Unfilled star
    }
  }
  

  
  
}
