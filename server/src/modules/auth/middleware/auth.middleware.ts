import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { githubApi } from "../../../services/github/github-api";
import { GithubUser } from "../../../services/github/entities/GithubUser";

export class AuthMiddleware {
  constructor(private readonly prisma: PrismaClient) {}

  async verify(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader)
      throw new UnauthorizedError("You are not logged in");

    const token = authorizationHeader.replace("Bearer ", "");

    const { data: githubUser } = await githubApi.get<GithubUser>("/user", {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const dbUser = await this.prisma.user.findFirst({
      where: {
        githubId: githubUser.id,
      },
    });

    if (!dbUser) throw new UnauthorizedError();

    req.githubAccessToken = token;
    req.user = dbUser;
    next();
  }
}
