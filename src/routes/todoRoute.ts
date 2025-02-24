import { Router } from "express";
import { getTodos, getTodo } from "../controllers/todoController";

const router = Router();

// Route to get all todos

router.route("/").get(getTodos);
router.route("/:id").get(getTodo);

export default router;
