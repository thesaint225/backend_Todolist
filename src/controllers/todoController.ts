import { NextFunction, Request, Response } from "express";
import Todo from "../models/todoApp";
import { asyncHandler } from "../helpers/asyncHandler";
import { TodoSchema } from "../validation/todoValidation";
import { TodoUpdateSchema } from "../validation/TodoUpdateSchema";

// @description all todos
// @route api/v1/

export const getTodos = asyncHandler(async (_req: Request, res: Response) => {
  await Todo.find({});

  res.status(200).json({
    success: true,
    msg: "show all todos",
  });
});

// @description  single todo
// @route        api/v1/todo/:id
// access       public

export const getTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const todoApp = await Todo.findById(id);

    if (!todoApp) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
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
  const parseResult = TodoSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      errors: parseResult.error.format(),
    });

    return;
  }

  // If validation is successful, create the Todo
  const todo = await Todo.create(parseResult);
  return res.status(201).json({
    success: true,
    data: todo,
  });
});

export const updateTodo = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    // Validate the request body using TodoUpdateSchema
    const parsedData = TodoUpdateSchema.safeParse(req.body);
    if (!parsedData.success) {
      // If validation fails, return the response early
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: parsedData.error.errors, // Show validation errors
      });
    }

    const { id } = req.params;

    // Try to update the todo
    const todoApp = await Todo.findByIdAndUpdate(id, parsedData.data, {
      new: true,
      runValidators: true,
    });

    // Handle case where todo was not found
    if (!todoApp) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Respond with the updated todo
    return res.status(200).json({
      success: true,
      data: todoApp, // Send the updated todo back
    });
  }
);

// @description:    singleBootcamp
// @route :         api/v1/todos
// @access :       public

export const SingleDeleteTodo = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const TodoApp = await Todo.findByIdAndDelete(id);

    if (!TodoApp) {
      return res.status(400).json({
        success: false,
        message: "Todo not found ",
      });
      return;
    }

    return res.status(200).json({
      success: true,
      msg: {},
    });
  }
);

//

export const deleteAllTodos = asyncHandler(
  async (req: Request, res: Response) => {
    const todoApp = await Todo.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All todos deleted",
    });
  }
);
