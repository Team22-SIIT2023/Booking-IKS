export interface Accommodation {
  _id: number;
  name: string;
  description: string;
  address: string;
  freeTimeSlots: string[];
  minGuests: number;
  maxGuests: number;
  accommodationType: string;
  pricePerGuest: boolean;
  automaticConfirmations: boolean;
  hostId: number;
  status: string;
  reservationDeadLine: number;
  amenities: string[];
  priceList: string[];
}
