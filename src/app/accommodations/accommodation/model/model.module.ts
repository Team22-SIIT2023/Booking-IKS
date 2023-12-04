export interface Accommodation {
  id: number;
  name: string;
  description: string;
  address: Address;
  //accommodationType: AccommodationType;
  hostId: number;
  // reservationDeadLine: number;
  amenities: Amenity[];
}

export interface Address {
  country:String;
  city:String;
  address:String;
}

export interface Amenity{
  id:Number;
  name:String;
  icon:String;

}

export interface FavoriteAccommodations{
  id:number;
  guestId:number;
  accommodationId:number;
}

export interface ReservationRequest {
  id:number
  timeSlot: TimeSlot;
  price: number;
  //guest: Guest;
  accommodation: Accommodation;
  status: RequestStatus;
}
export interface TimeSlot {
  startDate:Date;
  endDate:Date;
}
export enum RequestStatus {
  ACCEPTED,
  CANCELLED,
  WAITING

}
