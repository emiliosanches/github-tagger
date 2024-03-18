import { ExceptionHandler } from "./exception-handler";

let exceptionHandler: ExceptionHandler;

export function buildExceptionModule() {
  if (!exceptionHandler) {
    exceptionHandler = new ExceptionHandler();
  }
  
  return {
    exceptionHandler,
  }
}