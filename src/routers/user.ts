import express from "express";
const router = express.Router();
import {Register,Login,GetUser} from "../controllers/user";


router.post('/register',Register);
router.post('/login',Login);
router.get('/',GetUser);

module.exports = router;