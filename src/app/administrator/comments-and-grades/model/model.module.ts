import { Status, User, Host } from "src/app/account/model/model.module";

export interface CommentAndGrade{
  id?: number;
  text: string;
  date: Date;
  rating: number;
  status: Status;
  guest: Guest;
  host?:Host;
}

export interface Guest extends User {}
