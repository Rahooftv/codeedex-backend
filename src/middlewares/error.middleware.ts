import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errors: any[] = [];

  // Custom App Error
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Zod Validation Error
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";

    errors = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Mongoose Validation Error
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation Error";

    errors = Object.values(err.errors).map((error) => ({
      path: error.path,
      message: error.message,
    }));
  }

  // Invalid ObjectId
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ObjectId";
  }

  // Duplicate Key
  else if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;
  }

  // JWT Error
  else if (err instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid Token";
  }

  // JWT Expired
  else if (err instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = "Token Expired";
  }

  // Normal Error
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default globalErrorHandler;