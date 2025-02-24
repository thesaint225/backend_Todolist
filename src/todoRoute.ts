import { Router } from "express";
import { getTodos } from "./controllers/todoController";

const router = Router();

// Route to get all todos

router.route("/").get(getTodos);

export default router;
