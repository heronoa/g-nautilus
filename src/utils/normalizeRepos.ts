import { IRawRepository, IRepository } from "@/types";
import { parseDate, isValidUrl } from "./helpers";

export const normalizeRepos = (rawData: IRawRepository[]): IRepository[] => {
  if (!rawData || !Array.isArray(rawData)) {
    return [];
  }

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
    updatedAt: parseDate(repo?.updated_at),
    createdAt: parseDate(repo?.created_at),
    pushedAt: parseDate(repo?.pushed_at),
    owner: {
      login: repo?.owner?.login || "Unknown",
      avatarUrl: repo?.owner?.avatar_url || "",
      htmlUrl: isValidUrl(repo?.owner?.html_url)
        ? repo?.owner?.html_url || ""
        : "",
    },
    htmlUrl: isValidUrl(repo?.html_url)
      ? repo?.html_url || undefined
      : undefined,
    mirrorUrl:
      repo?.mirror_url && isValidUrl(repo?.mirror_url)
        ? repo?.mirror_url
        : undefined,
    watchersCount:
      typeof repo?.watchers_count === "number" ? repo?.watchers_count : 0,
    fork: repo?.fork ?? false,
    archived: repo?.archived ?? false,
    forkCount: repo?.forks_count ?? 0,
  }));
};
