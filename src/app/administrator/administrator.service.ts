import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { CommentAndGrade } from './comments-and-grades/model/model.module';
import { User } from '../account/model/model.module';


@Injectable({
  providedIn: 'root'
})

export class CommentAndGradeService {
  private commentAndGradeList: Comment[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<CommentAndGrade[]> {
    return this.httpClient.get<CommentAndGrade[]>(environment.apiHost + 'comments?status=ACTIVE')
  }

  add(comment: CommentAndGrade): Observable<CommentAndGrade> {
    return this.httpClient.post<CommentAndGrade>(environment.apiHost + 'add', comment)
  }

  getCommentAndGrade(id: number): Observable<CommentAndGrade> {
    return this.httpClient.get<CommentAndGrade>(environment.apiHost + 'comments/' + id)
  }

}
