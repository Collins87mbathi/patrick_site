import express, { Express } from "express";
const app: Express = express();
import { port, mongoUrl } from "./config/config";
import { connectDB } from "./Database/connection";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB(mongoUrl);

app.get("/", (req, res) => {
  res.send("Its a writing portfolio");
});

app.use("/api/user", require("./routers/user"));
app.use("/api/order", require("./routers/order"));
app.use("/api/email",require("./routers/mail"));

app.use(ErrorHandler);

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

