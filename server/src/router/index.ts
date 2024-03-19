import { NextFunction, Request, Response, Router } from "express";
import { modules } from "../modules";
import { CustomRouter } from "./custom-router";

const {
  auth: { authController, authMiddleware },
  repositories: { repositoriesController },
} = modules;

function protectedRoute(req: Request, res: Response, next: NextFunction) {
  return authMiddleware.verify(req, res, next);
}

const router = new CustomRouter(Router());

router.post("/auth", (req, res) => authController.authByCode(req, res));

router.get("/repositories", protectedRoute, (req, res) =>
  repositoriesController.listFavoriteRepositories(req, res)
);

router.post("/repositories/:repositoryId/tags", protectedRoute, (req, res) =>
  repositoriesController.addTagToRepository(req, res)
);

export { router };
