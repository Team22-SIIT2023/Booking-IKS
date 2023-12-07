import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation, CreateAccommodation, EditAccommodation} from "./accommodation/model/model.module";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})

export class AccommodationsService {
  accommodations: Accommodation[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  }

  add(accommodation: CreateAccommodation): Observable<CreateAccommodation> {
    return this.httpClient.post<CreateAccommodation>(environment.apiHost + "accommodations", accommodation)
  }

  update(accommodation: EditAccommodation): Observable<EditAccommodation> {
    return this.httpClient.put<EditAccommodation>(environment.apiHost + "accommodations/1", accommodation)
  }
  
  getAllFavorites(id:number): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'users/guest/'+id)
  } //u koji servis ovo da se stavi?

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  }
}
