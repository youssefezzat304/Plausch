import { NextFunction, Request, Response } from "express";
import { BaseError } from "@/utils/exception";
import { ErrorTitle, HttpStatusCode } from "@shared/exceptions/exceptions";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof BaseError) {
    return res.status(error.httpCode).json({
      title: error.title,
      status: error.httpCode,
      message: error.message,
    });
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER).json({
    title: ErrorTitle.ERROR,
    httpCode: HttpStatusCode.INTERNAL_SERVER,
    message: "Something went wrong. Please try again later.",
  });
}
