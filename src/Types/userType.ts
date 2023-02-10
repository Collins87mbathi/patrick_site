import { Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
  _doc: any;
  matchPassword(password: string): boolean | PromiseLike<boolean>;
}
