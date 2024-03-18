import { Response } from "express";

type ErrorResponseJson = {
  message: string;
  [x: string]: any;
};

export class HttpError extends Error {
  private readonly responseJson: ErrorResponseJson;

  constructor(
    public name: string,
    public statusCode: number,
    messageOrJson: string | ErrorResponseJson
  ) {
    const responseJson =
      typeof messageOrJson === "string"
        ? {
            message: messageOrJson,
          }
        : messageOrJson;

    super(responseJson.message);
    this.responseJson = responseJson;
  }

  sendResponse(res: Response) {
    res.status(this.statusCode).json(this.responseJson);
  }
}
