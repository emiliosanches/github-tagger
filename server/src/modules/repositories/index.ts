import { prisma } from "../../database/prisma";
import { RepositoriesController } from "./controllers/repositories.controller";
import { ListFavoriteRepositoriesUseCase } from "./use-cases/list-favorite-repositories.usecase";

let listFavoriteRepositoriesUseCase: ListFavoriteRepositoriesUseCase;
let repositoriesController: RepositoriesController;

export function buildRepositoriesModule() {
  if (!listFavoriteRepositoriesUseCase) {
    listFavoriteRepositoriesUseCase = new ListFavoriteRepositoriesUseCase(prisma);
  }

  if (!repositoriesController) {
    repositoriesController = new RepositoriesController(
      listFavoriteRepositoriesUseCase
    );
  }
  return {
    repositoriesController,
  };
}
