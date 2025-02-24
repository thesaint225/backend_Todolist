import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("change world");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
