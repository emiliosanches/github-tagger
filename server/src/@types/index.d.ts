import { Language, User } from "../custom";

export {};

declare global {
  namespace Express {
    export interface Request {
      githubAccessToken: string;
    }
  }
}
