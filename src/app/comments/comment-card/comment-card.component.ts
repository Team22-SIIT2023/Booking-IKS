import {Component, Input} from '@angular/core';
import {CommentAndGrade} from "../../administrator/comments-and-grades/model/model.module";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {

  protected readonly Array = Array;
  @Input()
  comment: CommentAndGrade | undefined;
  getStarColor(starIndex: number): string {
    // @ts-ignore
    return starIndex <= this.comment?.rating ? 'filled-star' : 'empty-star';
  }
}
