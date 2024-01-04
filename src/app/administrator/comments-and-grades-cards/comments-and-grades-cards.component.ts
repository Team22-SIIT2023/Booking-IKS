import { Component, OnInit, ViewChild } from '@angular/core';
import {CommentAndGradeService } from '../administrator.service';
import { CommentAndGrade } from '../comments-and-grades/model/model.module';
import {UserService} from "../../account/account.service";
import {Host, User} from "src/app/account/model/model.module";
import {CommentsService} from "../../comments/comments.service";
import {Accommodation} from "../../accommodations/accommodation/model/model.module";
import {ActivatedRoute} from "@angular/router";
import {AccommodationsService} from "../../accommodations/accommodations.service";

@Component({
  selector: 'app-comments-and-grades-cards',
  templateUrl: './comments-and-grades-cards.component.html',
  styleUrls: ['./comments-and-grades-cards.component.css']
})
export class CommentsAndGradesCardsComponent implements OnInit {

  commentsAndGrades: CommentAndGrade[] =[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  clickedCommentAndGrade: string='';
  accommodation:Accommodation;

  constructor(private service: CommentAndGradeService, private userService:UserService,
              private commentService: CommentsService, private root:ActivatedRoute,
              private acommodationsService:AccommodationsService) {
  }

  ngOnInit(): void {

    if (!(this.userService.getRole()==="ROLE_ADMIN")) {

      this.root.params.subscribe((params) =>{
        const id=+params['id']
        this.acommodationsService.getAccommodation(id).subscribe({
          next:(data:Accommodation)=>{
            this.accommodation=data;

            this.commentService.getHostComments(this.accommodation.host.id).subscribe({
              next:(data: CommentAndGrade[]) => {
                this.commentsAndGrades = data
              },
              error: (_) => {console.log("Greska!")}
            })
          }
          })
        })
    }

    else {
      this.service.getAll().subscribe({
        next:(data: CommentAndGrade[]) => {
          this.commentsAndGrades = data
        },
        error: (_) => {console.log("Greska!")}
      })
    }
  }

  onCommentAndGradeClicked(commentAndGrade: CommentAndGrade): void {
    this.ngOnInit();
    this.clickedCommentAndGrade = commentAndGrade.text + " " + commentAndGrade.id;
  }

  get paginatedComments(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.commentsAndGrades.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  getPages(): number[] {
    const totalItems = this.commentsAndGrades.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}

