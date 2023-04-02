import express, { Express } from "express";
import multer from 'multer';
import path from "path";
import fs from "fs";
import {Order} from "./models/Order";
const app: Express = express();
import { port, mongoUrl } from "./config/config";
import { connectDB } from "./Database/connection";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(cors({origin:'*'}));
connectDB(mongoUrl);

app.get("/", (req, res) => {
  res.send("Its a writing portfolio");
});

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const filename = req.file?.filename
    res.status(200).json({ message: 'File has been uploaded' , filename});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.use("/api/user", require("./routers/user"))
app.use("/api/order", require("./routers/order"));
app.use("/api/email",require("./routers/mail"));

app.use(ErrorHandler);

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

