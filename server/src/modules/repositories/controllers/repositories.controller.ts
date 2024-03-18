import { Request, Response } from "express";
import { ListFavoriteRepositoriesUseCase } from "../use-cases/list-favorite-repositories.usecase";

export class RepositoriesController {
  constructor(
    private readonly listFavRepositoriesUseCase: ListFavoriteRepositoriesUseCase
  ) {}

  async listFavoriteRepositories(req: Request, res: Response) {
    return res.send(
      await this.listFavRepositoriesUseCase.execute(
        req.githubAccessToken,
        req.user.id,
      )
    );
  }
}
