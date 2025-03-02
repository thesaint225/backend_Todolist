import { Request, Response } from "express";
import Todo from "../models/todoApp";
import { MongoServerError } from "mongodb";
import { asyncHandler } from "../helpers/asyncHandler";

// @description all todos
// @route api/v1/

export const getTodos = asyncHandler(async (_req: Request, res: Response) => {
  const todoApp = await Todo.find();

  res.status(200).json({
    success: true,
    msg: "show all todos",
  });
});

// @description  single todo
// @route        api/v1/todo/:id
// access       public

export const getTodo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const todoApp = await Todo.findById(id);

    if (!todoApp) {
      res.status(404).json({
        success: false,
        message: "Todo not found ",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todoApp,
    });
  }
);

// @description  create Todo
// @route        api/v1/todos
// @access       public

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error instanceof MongoServerError) {
      res.status(400).json({
        success: false,
        message: `Duplicate key Error:${JSON.stringify(error.keyValue)}`,
        details: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: "server error ",
      });
    }
  }
});

export const updateTodo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const todoApp = await Todo.findByIdAndUpdate(id);
    if (!todoApp) {
      res.status(400).json({
        success: false,
        message: "Todo not found ",
      });
    }
    res.status(200).json({
      success: true,
      msg: `update todo ${id}`,
    });
  }
);

// @description:    singleBootcamp
// @route :         api/v1/todos
// @access :       public

export const SingleDeleteTodo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const TodoApp = await Todo.findByIdAndDelete(id);

    if (!TodoApp) {
      res.status(400).json({
        success: false,
        message: "Todo not found ",
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: {},
    });
  }
);

//

export const deleteAllTodos = asyncHandler(
  async (req: Request, res: Response) => {
    const todoApp = await Todo.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All todos deleted",
    });
  }
);
