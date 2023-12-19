import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  Accommodation,
  AccommodationType,
  CreateAccommodation,
  EditAccommodation,
  PriceListItem,
  TimeSlot

} from "./accommodation/model/model.module";
import {environment} from "../../env/env";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class AccommodationsService {
  accommodations: Accommodation[] = [];
  private headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private httpClient: HttpClient) {
  }

  private formatDate(date: Date): string {
    return <string>new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
  }
  getAll(country?:string,city?:string,type?:AccommodationType,guestNum?:number,
         startDate?:Date,endDate?:Date,amenities?:string[],
         minPrice?:number,maxPrice?:number): Observable<Accommodation[]> {
    // let queryParams = {};

    let params=new HttpParams();
    if(type){
      params=params.set('type', type);
    }
    if(startDate && endDate){
      params=params.set('begin',this.formatDate(startDate));
      params=params.set('end',this.formatDate(endDate));
    }
    if (country && city) {
        params = params.set('country', country);
        params=params.set('city',city);
      }else if(country){
        params=params.set('country',country);
    }
    if(guestNum){
      params=params.set("guestNumber",guestNum);
    }
    if(amenities){
      amenities.forEach(amenity => {
        params = params.append('amenities', amenity);
      });
    }
    if(minPrice && maxPrice){
      params = params.append('start_price', minPrice);
      params = params.append('end_price', maxPrice);
    }

    // queryParams = {
    //   headers: this.headers,
    //   observe: 'response',
    //   params: params
    // };
    const options = { params: params };

    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations', options)
  }

  getUpdatedAndNew(): Observable<Accommodation[]> {
    const url = `${environment.apiHost}accommodations?status=CREATED`;
    return this.httpClient.get<Accommodation[]>(url);
  }

  getAccommodationPrice(id?:number,guestNum?:number,
                        startDate?:Date,endDate?:Date){
    let params=new HttpParams();
    if(startDate && endDate){
      params=params.set('begin',this.formatDate(startDate));
      params=params.set('end',this.formatDate(endDate));
    }
    if(guestNum){
      params=params.set("guestNumber",guestNum);
    }
    const options = { params };
    return this.httpClient.get<number>(environment.apiHost + 'accommodations/calculatePrice/'+id,options)
  }

  add(accommodation: CreateAccommodation): Observable<CreateAccommodation> {
    return this.httpClient.post<CreateAccommodation>(environment.apiHost + "accommodations", accommodation)
  }

  update(accommodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + "accommodations/" + accommodation.id, accommodation)
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
