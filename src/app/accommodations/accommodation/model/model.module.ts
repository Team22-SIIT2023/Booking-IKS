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
