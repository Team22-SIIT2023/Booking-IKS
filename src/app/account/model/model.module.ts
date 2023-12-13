export interface User {
  id: number;
  firstName:string;
  lastName:string;
  address:Address;
  phoneNumber : number;
  account : Account;
  picturePath : string;
}

export interface Address{
  country:string;
  city:string;
  address:string;
}

export interface Account{
  username : string;
  password: string;
  status : Status;
  role : Role;
}

export enum Status {
  ACTIVE,
  BLOCKED,
  REPORTED
}

export interface Role {
  name: string
}
