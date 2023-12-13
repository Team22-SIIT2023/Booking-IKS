import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  Accommodation,
  CreateAccommodation,
  EditAccommodation,
  PriceListItem,
  TimeSlot
} from "./accommodation/model/model.module";
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

  getUpdatedAndNew(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations?new')
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

  editPricelistItem(priceListItem: PriceListItem, id:number): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + "accommodations/editPricelist/" + id, priceListItem)
  }

  editFreeTimeSlotsItem(timeSlot: TimeSlot, id:number): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + "accommodations/editTimeSlot/" + id, timeSlot)
  }

  addPricelistItem(priceListItem: PriceListItem): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + "addPricelist/1", priceListItem)
  }

  uploadImage(files: File[], id: number): Observable<Accommodation> {
    const data: FormData = new FormData();
    for (let file of files) {
      data.append("images", file);
    }
    return this.httpClient.post<Accommodation>(environment.apiHost + "accommodations/" + id + "/upload-picture", data)
  }
}
