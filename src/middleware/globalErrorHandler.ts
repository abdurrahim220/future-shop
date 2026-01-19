import { ErrorRequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { TErrorSource } from "../interface/TErrorSource";
import { HTTP_STATUS } from "../errors/httpStatus";
import AppError from "../errors/appError";
import { config } from "../config/config";
type MongoDuplicateKeyError = {
  code: 11000;
  keyValue: Record<string, unknown>;
};

const globalErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error!";
  let errorMessages: TErrorSource[] = [
    {
      path: "",
      message,
    },
  ];

  /* ZOD ERROR */
  if (err instanceof ZodError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Validation Error";
    errorMessages = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (err instanceof mongoose.Error.ValidationError) {
    /* MONGOOSE VALIDATION ERROR */
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Validation Error";
    errorMessages = Object.values(err.errors).map((error) => ({
      path: error.path,
      message: error.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    /* MONGOOSE CAST ERROR */
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Invalid ID";
    errorMessages = [
      {
        path: err.path,
        message: `Invalid value for ${err.path}: ${err.value}`,
      },
    ];
  } else if (
    /* MONGOOSE DUPLICATE KEY ERROR */
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as MongoDuplicateKeyError).code === 11000
  ) {
    const duplicateError = err as MongoDuplicateKeyError;
    const key = Object.keys(duplicateError.keyValue)[0] || "unknown";

    statusCode = HTTP_STATUS.CONFLICT;
    message = "Duplicate Key Error";
    errorMessages = [
      {
        path: key,
        message: `${key} already exists`,
      },
    ];
  } else if (err instanceof AppError) {
    /* CUSTOM APP ERROR */
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    /* GENERIC ERROR */
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
