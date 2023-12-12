import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private priceSource = new BehaviorSubject<number>(0);
  private unitPriceSource = new BehaviorSubject<number>(0);

  currentPrice = this.priceSource.asObservable();
  unitPrice = this.unitPriceSource.asObservable();

  private isPerGuestSource = new BehaviorSubject<boolean>(true);
  isPerGuest = this.isPerGuestSource.asObservable();
  updateIsPerGuest(isPerGuest?: boolean) {
    if (isPerGuest==true || isPerGuest==false) {
      this.isPerGuestSource.next(isPerGuest);
    }

  }

  updatePrice(price?: number,unit?:number) {
    if (price != null) {
      this.priceSource.next(price);
    }
    if (typeof unit === "number") {
      this.unitPriceSource.next(unit);
    }
  }

  constructor() { }
}
