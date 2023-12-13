import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  Accommodation,
  AccommodationType,
  CreateAccommodation,
  EditAccommodation
} from "./accommodation/model/model.module";
import {environment} from "../../env/env";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class AccommodationsService {
  accommodations: Accommodation[] = [];

  constructor(private httpClient: HttpClient) {
  }

  private formatDate(date: Date): string {
    return <string>new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
  }
  getAll(country?:string,city?:string,type?:AccommodationType,guestNum?:number,
         startDate?:Date,endDate?:Date,amenities?:string[],
         minPrice?:number,maxPrice?:number): Observable<Accommodation[]> {
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

    const options = { params };
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations',options)
  }

  getUpdatedAndNew(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations?new')
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
