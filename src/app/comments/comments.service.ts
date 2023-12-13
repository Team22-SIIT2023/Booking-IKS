import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommentAndGrade} from "../administrator/comments-and-grades/model/model.module";
import {Status} from "../account/model/model.module";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: CommentAndGrade[] = [];

  constructor(private httpClient: HttpClient) { }
  getAverageAccommodationRating(id: number | undefined): Observable<number> {
    return this.httpClient.get<number>(environment.apiHost + 'comments/accommodation/'+id+'/averageRate')

  }
  getAllForAccommodation(id: number | undefined){
    let params = new HttpParams();
    params=params.set('status','ACTIVE');
    const options={params}
    return this.httpClient.get<CommentAndGrade[]>(environment.apiHost+'comments/accommodation/'+id,options);

  }
}
