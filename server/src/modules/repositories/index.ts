import { prisma } from "../../database/prisma";
import { RepositoriesController } from "./controllers/repositories.controller";
import { AddTagToRepositoryUseCase } from "./use-cases/add-tag-to-repository.usecase";
import { ListFavoriteRepositoriesUseCase } from "./use-cases/list-favorite-repositories.usecase";
import { RemoveTagFromRepositoryUseCase } from "./use-cases/remove-tag-from-repository.usecase";

let listFavoriteRepositoriesUseCase: ListFavoriteRepositoriesUseCase;
let addTagToRepositoryUseCase: AddTagToRepositoryUseCase;
let removeTagFromRepositoryUseCase: RemoveTagFromRepositoryUseCase;
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

  if (!removeTagFromRepositoryUseCase) {
    removeTagFromRepositoryUseCase = new RemoveTagFromRepositoryUseCase(prisma);
  }

  if (!repositoriesController) {
    repositoriesController = new RepositoriesController(
      listFavoriteRepositoriesUseCase,
      addTagToRepositoryUseCase,
      removeTagFromRepositoryUseCase,
    );
  }
  return {
    repositoriesController,
  };
}
