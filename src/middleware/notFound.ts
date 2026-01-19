import { HTTP_STATUS } from "../errors/httpStatus";
import { Request, Response } from "express";
class NotFoundError extends Error {
  constructor(path: string) {
    super(`Not Found - ${path}`);
    this.name = "NotFoundError";
  }
}

const notFound = (req: Request, res: Response) => {
  const error = new NotFoundError(req.originalUrl);

  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: error.message,
    errorMessage: [
      {
        path: req.originalUrl,
        message: error.message,
      },
    ],
  });
};

export default notFound;
