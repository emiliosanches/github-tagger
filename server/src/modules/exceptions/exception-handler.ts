import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../errors/HttpError";

export class ExceptionHandler {
  handleException(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      return err.sendResponse(res);
    }

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
