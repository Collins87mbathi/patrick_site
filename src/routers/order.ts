import express from "express";
import {
  CreateOrder,
  DeleteOrders,
  GetOrders,
  UpdatedOrders,
} from "../controllers/order";
const router = express.Router();

router.post("/", CreateOrder);
router.get("/", GetOrders);
router.delete("/:id", DeleteOrders);
router.put("/:id", UpdatedOrders);

module.exports = router;
