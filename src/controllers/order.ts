import { Order } from "../models/Order";
import { IOrder } from "../Types/orderType";
import { IReq, IRes, INext } from "../common/index";
import { ApiError } from "../Errors/Errors";

const getFileType = (buffer: Buffer): string => {
  if (buffer.slice(0, 4).toString() === '%PDF') {
    return 'pdf';
  } else if (buffer.slice(0, 4).toString() === 'PK\x03\x04') {
    return 'zip';
  } else if (buffer.slice(0, 2).toString() === 'BM') {
    return 'bmp';
  } else if (buffer.slice(0, 2).toString() === 'MZ') {
    return 'exe';
  } else if (buffer.slice(0, 4).toString() === '\x89PNG') {
    return 'png';
  } else if (buffer.slice(0, 2).toString() === 'II' || buffer.slice(0, 2).toString() === 'MM') {
    return 'tiff';
  } else if (buffer.slice(0, 4).toString() === 'RIFF' && buffer.slice(8, 12).toString() === 'WEBP') {
    return 'webp';
  } else if (buffer.slice(0, 4).toString() === 'Rar!') {
    return 'rar';
  } else if (buffer.slice(0, 2).toString() === 'PK') {
    return 'docx';
  } else {
    return 'unknown';
  }
};


class OrderController {
  public static CreateOrder = async (req: IReq, res: IRes, next: INext) => {
    try {
      const { email, paper, level, pages, deadline, price } = req.body;
      if (!email || !paper || !level || !pages || !deadline || !price)
        return next(ApiError.NotFound("please input values"));
        const { originalname, buffer } = req.file;
      const fileType = getFileType(originalname); // Get file type
      const fileName = `assignment.${fileType}`;

      const order = await Order.create({
        email,
        paper,
        level,
        pages,
        deadline,
        price,
        file: buffer,
        fileName
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
