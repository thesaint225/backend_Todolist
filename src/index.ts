import express, { Application, Request, Response } from "express";
import router from "./todoRoute";

const app: Application = express();
const PORT = 3000;
//body Parser
app.use(express.json());

// Mount the route
app.use("/api/v1/todos", router);

app.get("/", (req: Request, res: Response) => {
  res.send("change world");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
