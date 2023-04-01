import { Schema, Model, model } from "mongoose";
import { IOrder } from "../Types/orderType";



const OrderSchema: Schema<IOrder> = new Schema({
  email: {
    type: String,
    required: true,
  },
  paper: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  file: {
    type: String, // or you can use Buffer if you want to store file contents in the database
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

export const Order: Model<IOrder> = model("Order", OrderSchema);
