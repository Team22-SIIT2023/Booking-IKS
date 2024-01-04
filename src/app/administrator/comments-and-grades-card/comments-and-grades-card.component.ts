import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentAndGrade } from '../comments-and-grades/model/model.module';
import {UserService} from "../../account/account.service";
import {Status} from "../../account/model/model.module";
import {CommentsService} from "../../comments/comments.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-comments-and-grades-card',
  templateUrl: './comments-and-grades-card.component.html',
  styleUrls: ['./comments-and-grades-card.component.css']
})


export class CommentsAndGradesCardComponent {
  role:string;

  protected readonly Array = Array;

  @Input()
  commentAndGrade: CommentAndGrade|any;

  @Output()
  clicked: EventEmitter<CommentAndGrade> = new EventEmitter<CommentAndGrade>();

  constructor(private userService:UserService, private commentService: CommentsService, private snackBar: MatSnackBar) {
    this.role=userService.getRole();
  }

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

  getStarColor(starIndex: number): string {
    return starIndex <= this.commentAndGrade?.rating ? 'filled-star' : 'empty-star';
  }


  public reportHostComment(id: number|undefined) {
    this.commentService.reportComment(id, Status.REPORTED).subscribe({
      next: (data: CommentAndGrade) => {
        this.snackBar.open("Comment is reported!", 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.snackBar.open("You cannot report a comment!", 'Close', {
          duration: 3000,
        });
        console.log("Greska");
      }
    })
  }

  public deleteHostComment(id: number|undefined) {
    this.commentService.deleteComment(id).subscribe({
      next: data => {
        this.onCommentAndGradeClicked();
        // this.status = 'Delete successful';
      },
      error: (_) => {
        console.log("greeskaa")
      }
    });
  }
}
