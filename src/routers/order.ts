import express from "express";
import {
  CreateOrder,
  DeleteOrders,
  GetOrders,
  UpdatedOrders,
  GetDownload
} from "../controllers/order";
import {upload} from "../helpers/upload";
const router = express.Router();

router.post("/",upload.single('file'), CreateOrder);
router.get("/", GetOrders);
router.delete("/:id", DeleteOrders);
router.put("/:id", UpdatedOrders);
router.get("/:orderId/download",GetDownload);
module.exports = router;
