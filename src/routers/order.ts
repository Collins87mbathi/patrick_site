import express from "express";
import {
  CreateOrder,
  DeleteOrders,
  GetOrders,
  UpdatedOrders,
  DownloadFile
 
} from "../controllers/order";
// import {upload} from "../helpers/upload";
const router = express.Router();

router.post("/", CreateOrder);
router.get("/", GetOrders);
router.get("/:fileName", DownloadFile);
router.delete("/:id", DeleteOrders);
router.put("/:id", UpdatedOrders);
// router.get("/:orderId/download",GetDownload);
module.exports = router;
