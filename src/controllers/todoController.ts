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
