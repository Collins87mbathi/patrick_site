import { Order } from "../models/Order";
import { IOrder } from "../Types/orderType";
import { IReq, IRes, INext } from "../common/index";
import { ApiError } from "../Errors/Errors";
import path from "path";


class OrderController {
  public static CreateOrder = async (req: any, res: any, next: any) => {
    try {
      const { email, paper, level, pages, deadline, price } = req.body;
      if (!email || !paper || !level || !pages || !deadline || !price)
        return next(ApiError.NotFound("please input values"));
  
      const order = new Order({
        email,
        paper,
        level,
        pages,
        deadline,
        price,
        file: req.file.path // Add the file path to the order document
      });
  
      await order.save();
  
      res.status(200).json(order);
    } catch (error: any) {
      console.log(error);
    }
  };
  
  public static GetDownload = async (req: IReq, res: IRes, next: INext) => {
    try {
      try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        const filePath = order.file;
        const fileName = path.basename(filePath);
    
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.sendFile(filePath);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    } catch (error: any) {
      next(ApiError.InternalError(error.response.message));
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
  }
}

export const { CreateOrder, GetOrders, UpdatedOrders, DeleteOrders, GetDownload } =
  OrderController;
