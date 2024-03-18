import { PrismaClient } from "@prisma/client";
import { githubApi, githubOAuthApi } from "../../../services/github/github-api";
import { GithubUser } from "../../../services/github/entities/GithubUser";
import { GithubUserEmail } from "../../../services/github/entities/GithubUserEmail";

export class AuthByCodeUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute(code: string) {
    const tokenResponse = await githubOAuthApi.post(
      "login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }
    );

    console.log(tokenResponse.data);

    const { data: userResponse } = await githubApi
      .get<GithubUser>("/user", {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.config.headers);
        console.log(err.response.config);
        throw err;
      });

    const { data: userEmailsResponse } = await githubApi.get<GithubUserEmail[]>("/user/emails", {
      headers: {
        Authorization: `Bearer ${tokenResponse.data.access_token}`,
      },
    });

    const primaryEmail = userEmailsResponse.find((email) => email.primary);

    // todo change to custom error
    if (!primaryEmail) throw new Error();

    let databaseUser = await this.prisma.user.findUnique({
      where: {
        email: primaryEmail.email,
      },
    });

    if (!databaseUser) {
      databaseUser = await this.prisma.user.create({
        data: {
          name: userResponse.name,
          email: primaryEmail.email,
          githubId: userResponse.id,
          githubAvatarURL: userResponse.avatar_url,
        },
      });
    }

    return {
      access_token: tokenResponse.data.access_token,
      user: databaseUser,
    };
  }
}
