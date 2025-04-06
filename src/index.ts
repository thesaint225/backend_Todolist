import express, { Application, Request, Response } from "express";
import connectDB from "./config/db";
import * as dotenv from "dotenv";
import router from "./routes/todoRoute";
import errorHandler from "./middlewares/errorHandler";

// load the enviroment first variable first
if (!process.env.MONGO_URI) {
  throw new Error("Missing Mongo_URI");
}
dotenv.config();

// connect database
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;
//body Parser
app.use(express.json());

// Mount the route
app.use("/api/v1/todos", router);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("change world");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
