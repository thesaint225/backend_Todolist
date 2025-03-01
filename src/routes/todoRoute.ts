import { Router } from "express";
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  SingleDeleteTodo,
  deleteAllTodos,
} from "../controllers/todoController";

const router = Router();

// Route to get all todos

router.route("/").get(getTodos).post(createTodo).delete(deleteAllTodos);
router.route("/:id").get(getTodo).put(updateTodo).delete(SingleDeleteTodo);

export default router;
