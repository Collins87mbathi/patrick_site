import express from "express";
import {sendMailer} from "../controllers/sendMailer";
const router = express();


router.post('/',sendMailer);


module.exports = router;
