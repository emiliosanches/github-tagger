import { prisma } from "../database/prisma";
import { buildAuthModule } from "./auth";
import { buildExceptionModule } from "./exceptions";
import { buildRepositoriesModule } from "./repositories";

export const modules = {
  auth: buildAuthModule(prisma),
  exception: buildExceptionModule(),
  repositories: buildRepositoriesModule(),
};
