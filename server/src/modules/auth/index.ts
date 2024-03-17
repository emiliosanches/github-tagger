import { AuthController } from "./controllers/auth-controller";
import { AuthByCodeUseCase } from "./use-cases/auth-by-code.usecase"

let controller: AuthController;
let useCase: AuthByCodeUseCase;

export function buildAuthModule() {
  if (!useCase) {
    useCase = new AuthByCodeUseCase();
  }
  
  if (!controller) {
    controller = new AuthController(useCase);
  }

  return {
    controller: controller,
  }
}
