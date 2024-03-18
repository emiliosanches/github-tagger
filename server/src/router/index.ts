import { NextFunction, Request, Response, Router } from "express";
import { forwardException } from "../helpers/forward-exception";
import { modules } from "../modules";
import { CustomRouter } from "./custom-router";

const { authController, authMiddleware } = modules.auth;

function protectedRoute(req: Request, res: Response, next: NextFunction) {
  return authMiddleware.verify(req, res, next);
}

const router = new CustomRouter(Router());

router.post(
  "/auth",
  forwardException((req, res) => authController.authByCode(req, res))
);

router.get("/protected-route", protectedRoute, (req, res) =>
  res.send("Hello world")
);

export { router };
