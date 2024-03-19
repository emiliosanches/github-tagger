import { HttpError } from "./HttpError";

export class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super("ConflictError", 409, message);
  }
}
