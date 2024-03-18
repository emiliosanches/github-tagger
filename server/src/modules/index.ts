import { prisma } from "../database/prisma";
import { buildAuthModule } from "./auth";
import { buildExceptionModule } from "./exceptions";

export const modules = {
  auth: buildAuthModule(prisma),
  exception: buildExceptionModule(),
};
