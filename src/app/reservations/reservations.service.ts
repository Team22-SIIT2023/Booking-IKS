import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestStatus, ReservationRequest} from "../accommodations/accommodation/model/model.module";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private requestList: ReservationRequest[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(requestParam: RequestStatus, accommodationName?: string,startDate? :string,endDate?:string): Observable<ReservationRequest[]> {
    const enumParam = RequestStatus[requestParam];
    let params = new HttpParams().set('status', enumParam);

    if(startDate && endDate){
      params=params.set('begin',startDate);
      params=params.set('end',endDate);
    }

    if (accommodationName) {
      params = params.set('accommodationName', accommodationName);
    }

    const options = { params };

    return this.httpClient.get<ReservationRequest[]>(environment.apiHost + 'requests', options);
  }

}
