
export interface Notification {
  id?: number;
  text: string;
  date: Date;
  turnedOn: boolean;
  type: NotificationType;
}

export enum NotificationType {
  RESERVATION_REQUEST,
  RESERVATION_CANCELLED,
  HOST_RATED,
  ACCOMMODATION_RATED,
  RESERVATION_RESPONSE
}
