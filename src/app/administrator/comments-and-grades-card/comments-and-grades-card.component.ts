import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentAndGrade } from '../comments-and-grades/model/model.module';

@Component({
  selector: 'app-comments-and-grades-card',
  templateUrl: './comments-and-grades-card.component.html',
  styleUrls: ['./comments-and-grades-card.component.css']
})


  

export class CommentsAndGradesCardComponent {

  protected readonly Array = Array;

  @Input()
  commentAndGrade: CommentAndGrade |any;

  @Output()
  clicked: EventEmitter<CommentAndGrade> = new EventEmitter<CommentAndGrade>();

  onCommentAndGradeClicked(): void {
    this.commentAndGrade = this.commentAndGrade;
    this.clicked.emit(this.commentAndGrade);
    
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
