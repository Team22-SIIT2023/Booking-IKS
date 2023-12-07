import { Component, OnInit, ViewChild } from '@angular/core';
import {CommentAndGradeService } from '../administrator.service';
import { CommentAndGrade } from '../comments-and-grades/model/model.module';

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
  
  constructor(private service: CommentAndGradeService) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next:(data: CommentAndGrade[]) => {
        this.commentsAndGrades = data
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  onCommentAndGradeClicked(commentAndGrade: CommentAndGrade): void {
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

