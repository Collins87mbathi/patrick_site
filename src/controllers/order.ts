import { Order } from "../models/Order";
import { IOrder } from "../Types/orderType";
import { IReq, IRes, INext } from "../common/index";
import { ApiError } from "../Errors/Errors";

class OrderController {
  public static CreateOrder = async (req: IReq, res: IRes, next: INext) => {
    try {
      const { email, paper, level, pages, deadline, price } = req.body;
      if (!email || !paper || !level || !pages || !deadline || !price)
        return next(ApiError.NotFound("please input values"));

      const order = await Order.create({
        email,
        paper,
        level,
        pages,
        deadline,
        price,
      });
      await order.save();

      res.status(200).json(order);
    } catch (error: any) {
      next(ApiError.InternalError(error));
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

export const { CreateOrder, GetOrders, UpdatedOrders, DeleteOrders } =
  OrderController;
