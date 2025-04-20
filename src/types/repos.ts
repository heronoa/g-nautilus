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
  updatedAt: Date | null;
  owner: {
    login: string;
    avatarUrl: string;
    htmlUrl: string | undefined;
  };
  watchersCount: number;
  fork: boolean;
  archived: boolean;
  mirrorUrl?: string | null;
  pushedAt?: Date | null;
  createdAt?: Date | null;
}
