import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode || 500;
  const message =
    error.message || "Oops, something went wrong. Please try again.";
  return res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
      errors: error.errors,
    },
  });
}

export default errorMiddleware;
