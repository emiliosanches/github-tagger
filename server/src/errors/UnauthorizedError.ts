import { HttpError } from "./HttpError";

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super("UnauthorizedError", 401, message);
  }
}
