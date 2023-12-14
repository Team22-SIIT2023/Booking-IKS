export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  address: Address;
  phoneNumber: string;
  account: Account;
  picturePath?: string;
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
  role: Role[];
}

export interface Role {
  id?: number;
  name: string;
}
//add role class insted of enum type!!

export enum Status {
  PENDING,
  ACTIVE,
  BLOCKED,
  REPORTED
}

export enum Type {
  GUEST,
  HOST,
  ADMIN
}
