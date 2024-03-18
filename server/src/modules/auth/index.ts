import { PrismaClient } from "@prisma/client";
import { AuthController } from "./controllers/auth-controller";
import { AuthByCodeUseCase } from "./use-cases/auth-by-code.usecase"

let controller: AuthController;
let useCase: AuthByCodeUseCase;

export function buildAuthModule(prisma: PrismaClient) {
  if (!useCase) {
    useCase = new AuthByCodeUseCase(prisma);
  }
  
  if (!controller) {
    controller = new AuthController(useCase);
  }

  return {
    controller: controller,
  }
}
