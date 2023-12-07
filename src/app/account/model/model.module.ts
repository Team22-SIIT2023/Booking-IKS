export interface User {
  id: number;
  firstName:string;
  lastName:string;
  address:Address;
  phoneNumber : string;
  account : Account;
  picturePath : string;
}

export interface Address{
  country:string;
  city:string;
  postalCode:String;
  address:string;
}

export interface Account{
  email : string;
  password: string;
  status : Status;
  type : Type;
}

export enum Status {
  ACTIVE,
  BLOCKED,
  REPORTED
}

export enum Type {
  GUEST,
  HOST,
  ADMIN
}
