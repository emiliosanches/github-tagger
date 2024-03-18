import { GithubUser } from "./GithubUser";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: GithubUser;
  description: string;
}
