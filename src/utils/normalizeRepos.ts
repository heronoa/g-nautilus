import { IRawRepository, IRepository } from "@/types";
import { parseDate, isValidUrl } from "./helpers";

export const normalizeRepos = (rawData: IRawRepository[]): IRepository[] => {
  return rawData.map((repo) => ({
    id: repo?.id,
    name: repo?.name || "No Name",
    description: repo?.description || null,
    language:
      repo?.language?.trim() && repo?.language?.length > 0
        ? repo.language
        : "Unknown",
    stargazers_count:
      typeof repo?.stargazers_count === "number" ? repo?.stargazers_count : 0,
    updated_at: parseDate(repo?.updated_at),
    created_at: parseDate(repo?.created_at),
    pushed_at: parseDate(repo?.pushed_at),
    owner: {
      login: repo.owner?.login || "Unknown",
      avatar_url: repo.owner?.avatar_url || "",
      html_url: isValidUrl(repo?.owner?.html_url)
        ? repo.owner?.html_url || ""
        : "",
    },
    watchers_count:
      typeof repo?.watchers_count === "number" ? repo?.watchers_count : 0,
    fork: repo?.fork ?? false,
    archived: repo?.archived ?? false,
  }));
};
