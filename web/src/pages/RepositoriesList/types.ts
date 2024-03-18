export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    id: number;
    login: string;
    avatar_url: string;
  };
  description: string;
  tags: Array<{
    id: string;
    text: string;
  }>;
}
