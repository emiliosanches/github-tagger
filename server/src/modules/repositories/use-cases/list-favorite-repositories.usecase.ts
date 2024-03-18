import { PrismaClient, RepositoryTag } from "@prisma/client";
import { GithubRepo } from "../../../services/github/entities/GithubRepo";
import { githubApi } from "../../../services/github/github-api";

export class ListFavoriteRepositoriesUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(access_token: string, userId: string) {
    const { data: repos } = await githubApi.get<GithubRepo[]>("/user/starred", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const tags = await this.prisma.repositoryTag.findMany({
      where: {
        userId,
      },
    });

    const tagsByRepoId: {
      [id: number]: RepositoryTag[];
    } = {};

    for (const tag of tags) {
      if (!tagsByRepoId[tag.repositoryId]) tagsByRepoId[tag.repositoryId] = [];
      tagsByRepoId[tag.repositoryId].push(tag);
    }

    return repos.map((repo) => ({
      ...repo,
      tags: tagsByRepoId[repo.id],
    }));
  }
}
