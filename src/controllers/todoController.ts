import { Request, Response } from "express";
import Todo from "../models/todoApp";
import { MongoServerError } from "mongodb";

// @description all todos

export const getTodos = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: "show all students",
  });
};
