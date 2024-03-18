import { RequestHandler, Router } from "express";
import { forwardException } from "../helpers/forward-exception";

export class CustomRouter {
  constructor(private router: Router) {}

  private forwardHandlersExceptions(...handlers: RequestHandler[]) {
    return handlers.map((h) => forwardException(h));
  }

  get(path: string, ...handlers: RequestHandler[]) {
    this.router.get(path, ...this.forwardHandlersExceptions(...handlers));
  }

  post(path: string, ...handlers: RequestHandler[]) {
    this.router.post(path, ...this.forwardHandlersExceptions(...handlers));
  }

  put(path: string, ...handlers: RequestHandler[]) {
    this.router.put(path, ...this.forwardHandlersExceptions(...handlers));
  }

  patch(path: string, ...handlers: RequestHandler[]) {
    this.router.patch(path, ...this.forwardHandlersExceptions(...handlers));
  }

  delete(path: string, ...handlers: RequestHandler[]) {
    this.router.delete(path, ...this.forwardHandlersExceptions(...handlers));
  }

  getRouter() {
    return this.router;
  }
}
