import { Request, Response } from "express";
import Todo from "../models/todoApp";
import { MongoServerError } from "mongodb";

// @description all todos
// @route api/v1/

export const getTodos = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: "show all todos",
  });
};

// @description  single todo
// @route        api/v1/todo/:id
// access       public

export const getTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    success: "true",
    message: `show todo no ${id}`,
  });
};

// @description  create Todo
// @route        api/v1/todos
// @access       public

export const createTodo = async (req: Request, res: Response) => {
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
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    msg: `update todo ${id}`,
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    msg: {},
  });
};
