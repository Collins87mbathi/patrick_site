import { Document } from "mongoose";

export interface IOrder extends Document {
  email: string;
  paper: string;
  level: string;
  deadline: string;
  pages: number;
  price: string;
  isComplete: boolean;
  file: string;
  fileType: string;
  fileName: string,
  
}
