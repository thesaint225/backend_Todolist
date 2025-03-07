import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorResponse from "../utils/errorResponse";
import { MongoServerError } from "mongodb";
import { error } from "console";

const errorHandler = (
  err: Error | ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // default error response values
  let statusCode = err instanceof ErrorResponse ? err.statusCode || 500 : 500;
  let message =
    err instanceof ErrorResponse
      ? err.message || "server Error"
      : "Server Error ";

  console.error("Error occured:", err);

  // Handle Mongoose ValidationError (schema validation failure )

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400; // Bad request
    message = Object.values(err.errors)
      .map((error) => `${error.path}: ${error.message}`) // ✅ Extract the message
      .join(", "); // ✅ Convert to a string
  }

  //   handle Mongoose CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 404;
    message = `Resource not found with id of ${err.value}`;
  }

  //   Handle Mongoose duplicate key error
  if (err instanceof MongoServerError && err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered ";
  }

  //   Final error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
