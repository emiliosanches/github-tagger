import { PrismaClient } from "@prisma/client";
import { AuthController } from "./controllers/auth.controller";
import { AuthByCodeUseCase } from "./use-cases/auth-by-code.usecase";
import { AuthMiddleware } from "./middleware/auth.middleware";

let controller: AuthController;
let useCase: AuthByCodeUseCase;
let middleware: AuthMiddleware;

export function buildAuthModule(prisma: PrismaClient) {
  if (!useCase) {
    useCase = new AuthByCodeUseCase(prisma);
  }

  if (!controller) {
    controller = new AuthController(useCase);
  }

  if (!middleware) {
    middleware = new AuthMiddleware(prisma);
  }

  return {
    authController: controller,
    authMiddleware: middleware,
  };
}
