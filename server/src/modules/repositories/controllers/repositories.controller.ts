import { Request, Response } from "express";
import { ListFavoriteRepositoriesUseCase } from "../use-cases/list-favorite-repositories.usecase";
import { AddTagToRepositoryUseCase } from "../use-cases/add-tag-to-repository.usecase";
import { addTagToRepositorySchema } from "../schemas/add-tag-to-repository.schema";
import { RemoveTagFromRepositoryUseCase } from "../use-cases/remove-tag-from-repository.usecase";

export class RepositoriesController {
  constructor(
    private readonly listFavRepositoriesUseCase: ListFavoriteRepositoriesUseCase,
    private readonly addTagToRepositoryUseCase: AddTagToRepositoryUseCase,
    private readonly removeTagFromRepositoryUseCase: RemoveTagFromRepositoryUseCase
  ) {}

  async listFavoriteRepositories(req: Request, res: Response) {
    let search = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;

    if (typeof search === 'object') search = undefined;

    return res.send(
      await this.listFavRepositoriesUseCase.execute(
        req.githubAccessToken,
        req.user.id,
        search
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

  async removeTagFromRepository(req: Request, res: Response) {
    return res.send(
      await this.removeTagFromRepositoryUseCase.execute(
        req.user.id,
        req.params.tagText,
        Number(req.params.repositoryId)
      )
    );
  }
}
