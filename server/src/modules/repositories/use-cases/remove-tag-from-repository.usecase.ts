import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../../errors/NotFoundError";

export class RemoveTagFromRepositoryUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string, tagText: string, repositoryId: number) {
    const tag = await this.prisma.repositoryTag.findFirst({
      where: {
        repositoryId,
        text: tagText,
        userId,
      },
    });

    if (!tag) {
      throw new NotFoundError(
        "The specified tag does not exist in the repository"
      );
    }

    await this.prisma.repositoryTag.delete({
      where: {
        id: tag.id,
      },
    });
  }
}
