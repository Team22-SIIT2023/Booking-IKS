import {Account, User} from "../../../account/model/model.module";

export interface Accommodation {
  id?: number;
  name: string;
  description: string;
  address: Address;
  //accommodationType: AccommodationType;
  hostId: number;
  // reservationDeadLine: number;
  amenities: Amenity[];
}

export interface Address {
  id?: number;
  country:String;
  city:String;
  address:String;
}

export interface Amenity {
  id?:Number;
  name:String;
}

export interface TimeSlot {
  id?:Number;
  startDate: Date;
  endDate: Date;
}

export interface PriceListItem {
  id?: Number;
  timeSlot: TimeSlot;
  price: number;
}
export interface Host extends User{

}

export interface CreateAccommodation {
  name: string;
  description: string;
  address: Address;
  minGuests: number;
  maxGuests: number;
  type: AccommodationType;
  pricePerGuest: boolean;
  automaticConfirmation: boolean;
  hostId: Host;
  reservationDeadline: number;
  amenities: Amenity[];
  priceList: PriceListItem[];
  freeTimeSlots: TimeSlot[];
}

export enum AccommodationType {
  HOTEL,
  MOTEL,
  VILLA,
  APARTMENT
}

export interface EditAccommodation{
  pricePerGuest: boolean;
  automaticConfirmation: boolean;
  reservationDeadline: number;
  priceList: PriceListItem[];
  freeTimeSlots: TimeSlot[];
}
