import {Account, User} from "../../../account/model/model.module";
import {Guest} from "../../../administrator/comments-and-grades/model/model.module";

export interface Accommodation {
  id?: number;
  name?: string;
  description?: string;
  address?: Address;
  minGuests?: number;
  maxGuests?: number;
  type?: AccommodationType;
  pricePerGuest?: boolean;
  automaticConfirmation?: boolean;
  status?: AccommodationStatus;
  host?: Host;
  reservationDeadline?: number;
  amenities?: Amenity[];
  priceList?: PriceListItem[];
  freeTimeSlots?:TimeSlot[];
}
export enum AccommodationStatus {
  ACCEPTED,
  UPDATED,
  CREATED,
  DECLINED

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
  host: Host;
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

export interface FavoriteAccommodations{
  id:number;
  guestId:number;
  accommodationId:number;
}

export interface ReservationRequest {
  id?:number
  timeSlot?: TimeSlot;
  price?: number;
  guest?: Guest;
  accommodation?: Accommodation;
  status?: RequestStatus;
  guestNumber?:number;
}

export enum RequestStatus {
  ACCEPTED,
  CANCELLED,
  WAITING

}
