import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  CreateAccommodation,
  RequestStatus,
  ReservationRequest
} from "../accommodations/accommodation/model/model.module";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private requestList: ReservationRequest[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(status: RequestStatus, accommodationName?: string,startDate? :string,endDate?:string): Observable<ReservationRequest[]> {
    const enumParam = RequestStatus[status];
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
  add(request: ReservationRequest): Observable<ReservationRequest> {
    return this.httpClient.post<ReservationRequest>(environment.apiHost + "requests", request);
  }

  getAllForHost(userId: number, status: RequestStatus, accommodationName: string, startDate: string, endDate: string) {
    let params = new HttpParams();
      if(status){
          params= params.set('status', status);
      }
    if(startDate && endDate){
      params=params.set('begin',startDate);
      params=params.set('end',endDate);
    }
    if (accommodationName) {
      params = params.set('accommodationName', accommodationName);
    }

    const options = { params };

    return this.httpClient.get<ReservationRequest[]>(environment.apiHost + 'requests/host/'+userId, options);
  }

  getAllForGuest(userId: number, status: RequestStatus, accommodationName: string, startDate: string, endDate: string) {
    let params = new HttpParams();
    if(status){
      params= params.set('status', status);
    }

    if(startDate && endDate){
      params=params.set('begin',startDate);
      params=params.set('end',endDate);
    }
    if (accommodationName) {
      params = params.set('accommodationName', accommodationName);
    }

    const options = { params };

    return this.httpClient.get<ReservationRequest[]>(environment.apiHost + 'requests/guest/'+userId, options);
  }
}
