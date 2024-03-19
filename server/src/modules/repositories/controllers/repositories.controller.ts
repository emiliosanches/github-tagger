import { Request, Response } from "express";
import { ListFavoriteRepositoriesUseCase } from "../use-cases/list-favorite-repositories.usecase";
import { AddTagToRepositoryUseCase } from "../use-cases/add-tag-to-repository.usecase";
import { addTagToRepositorySchema } from "../schemas/add-tag-to-repository.schema";

export class RepositoriesController {
  constructor(
    private readonly listFavRepositoriesUseCase: ListFavoriteRepositoriesUseCase,
    private readonly addTagToRepositoryUseCase: AddTagToRepositoryUseCase
  ) {}

  async listFavoriteRepositories(req: Request, res: Response) {
    return res.send(
      await this.listFavRepositoriesUseCase.execute(
        req.githubAccessToken,
        req.user.id
      )
    );
  }

  async addTagToRepository(req: Request, res: Response) {
    const body = addTagToRepositorySchema.parse(req.body);

    return res.send(
      await this.addTagToRepositoryUseCase.execute(
        req.user.id,
        body.tagText,
        Number(req.params.repositoryId)
      )
    );
  }
}
