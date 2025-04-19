import { IGithubRepository } from "./github";
import { Nullable, PartialNested } from "./helpers";

export type IRawRepository = PartialNested<Nullable<IGithubRepository>> & {
  id: number;
};

export interface IRepository {
  id: number;
  name: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  updated_at: Date | null;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string | undefined;
  };
  watchers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at?: Date | null;
  created_at?: Date | null;
}
