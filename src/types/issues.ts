import { IGithubIssue } from "./github";
import { Nullable, PartialNested } from "./helpers";

export type IRawIssue = PartialNested<Nullable<IGithubIssue>> & {
  id: number;
};

export interface IIssue {
  id: number;
  title: string;
  user: {
    login: string;
    htmlUrl?: string;
  };
  htmlUrl?: string;
  state: string;
  url?: string;
  reactions: {
    url?: string;
    totalCount: number;
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  updatedAt: Date | null;
  createdAt: Date | null;
}
