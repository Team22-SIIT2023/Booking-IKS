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

  getAll(requestParam: RequestStatus): Observable<ReservationRequest[]> {
    const enumParam = RequestStatus[requestParam];

    const params = new HttpParams().set('status', enumParam);

    const options = { params };

    return this.httpClient.get<ReservationRequest[]>(environment.apiHost + 'requests', options);
  }

  //add getAllForGuest and getAllForHost that have ids as path variable and status as request param!
  //also add guest and host models!

}
