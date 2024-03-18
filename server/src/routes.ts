import { NextFunction, Request, Response, Router } from "express";
import { modules } from "./modules";

const { authController, authMiddleware } = modules.auth;

function protectedRoute(req: Request, res: Response, next: NextFunction) {
  authMiddleware.verify(req, res, next);
}

const router = Router();

router.post("/auth", (req, res) => authController.authByCode(req, res));
router.get("/protected-route", protectedRoute, (req, res) =>
  res.send("Hello world")
);

export { router };
