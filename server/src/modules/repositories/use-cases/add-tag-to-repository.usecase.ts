import { PrismaClient } from "@prisma/client";
import { ConflictError } from "../../../errors/ConflictError";

export class AddTagToRepositoryUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string, tagText: string, repositoryId: number) {
    const tag = await this.prisma.repositoryTag.findFirst({
      where: {
        repositoryId,
        text: tagText,
      },
    });

    if (tag) {
      throw new ConflictError("This tag is already added to the repository");
    }

    await this.prisma.repositoryTag.create({
      data: {
        repositoryId,
        text: tagText,
        userId,
      },
    });
  }
}
