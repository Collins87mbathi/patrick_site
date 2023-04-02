import { Order } from "../models/Order";
import { IOrder } from "../Types/orderType";
import { IReq, IRes, INext } from "../common/index";
import { ApiError } from "../Errors/Errors";
import fs from "fs";
import path from "path";

class OrderController {
  public static CreateOrder = async (req: any, res: any, next: any) => {
    try {
      // Create a new order
      const order = new Order(req.body);
  
      // Save the order in the database
      await order.save();
  
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  public static GetOrders = async (req: IReq, res: IRes, next: INext) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error: any) {
      next(ApiError.InternalError(error.response.message));
    }
  };

  public static DeleteOrders = async (req: IReq, res: IRes, next: INext) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("The Order was Deleted");
    } catch (error: any) {
      next(ApiError.InternalError(error));
    }
  };

  public static UpdatedOrders = async (req: IReq, res: IRes, next: INext) => {
    try {
      await Order.updateOne({ _id: req.params.id }, { isComplete: true });
      res.status(200).json("Order Updated");
    } catch (error: any) {
      next(ApiError.InternalError(error));
    }
  };

  public static DownloadFile = async (req: any, res: any, next: any) => {
    try {
      const fileName = req.params.fileName; // get the filename from the request parameter
      
      // check if the file exists in the local directory
      const fileExists = fs.existsSync(`./uploads/${fileName}`);
      if (!fileExists) {
        return res.status(404).json({ error: "File not found" });
      }
      
      // set the headers for the file download
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-Type", "application/octet-stream");
      
      // create a read stream from the file and pipe it to the response object
      const fileStream = fs.createReadStream(`./uploads/${fileName}`);
      fileStream.pipe(res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
}



export const {
  CreateOrder,
  GetOrders,
  UpdatedOrders,
  DeleteOrders,
  DownloadFile
} = OrderController;
