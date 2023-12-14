export interface User {
  id: number;
  firstName:string;
  lastName:string;
  address:Address;
  phoneNumber : number;
  account : Account;
  picturePath? : string;
  lastPasswordResetDate?: Date
}

export interface Address{
  country?: string;
  city?: string;
  postalCode?: string;
  address: string;
}

export interface Account{
  id?: number;
  username : string;
  password: string;
  status: Status;
  roles: Role[];
}

export interface Role {
  id?: number;
  name: string;
}

export enum Status {
  PENDING,
  ACTIVE,
  BLOCKED,
  REPORTED
}

