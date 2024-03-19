import { prisma } from "../../database/prisma";
import { RepositoriesController } from "./controllers/repositories.controller";
import { AddTagToRepositoryUseCase } from "./use-cases/add-tag-to-repository.usecase";
import { ListFavoriteRepositoriesUseCase } from "./use-cases/list-favorite-repositories.usecase";

let listFavoriteRepositoriesUseCase: ListFavoriteRepositoriesUseCase;
let addTagToRepositoryUseCase: AddTagToRepositoryUseCase;
let repositoriesController: RepositoriesController;

export function buildRepositoriesModule() {
  if (!listFavoriteRepositoriesUseCase) {
    listFavoriteRepositoriesUseCase = new ListFavoriteRepositoriesUseCase(
      prisma
    );
  }

  if (!addTagToRepositoryUseCase) {
    addTagToRepositoryUseCase = new AddTagToRepositoryUseCase(prisma);
  }

  if (!repositoriesController) {
    repositoriesController = new RepositoriesController(
      listFavoriteRepositoriesUseCase,
      addTagToRepositoryUseCase
    );
  }
  return {
    repositoriesController,
  };
}
