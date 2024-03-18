import { prisma } from "../database/prisma";
import { buildAuthModule } from "./auth";

export const modules = {
  auth: buildAuthModule(prisma),
};
