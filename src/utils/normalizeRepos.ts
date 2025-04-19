import { IRawRepository, IRepository } from "@/types";

export const normalizeRepos = (rawData: IRawRepository[]): IRepository[] => {
  return rawData.map((repo) => ({
    id: repo.id,
    name: repo.name || "No Name",
    description: repo.description || null,
    language:
      repo.language && repo.language.length > 0 ? repo.language : "Unknown",
    stargazers_count:
      typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0,
    updated_at: parseDate(repo?.updated_at),
    owner: {
      login: repo.owner?.login || "Unknown",
      avatar_url: repo.owner?.avatar_url || "",
      html_url: isValidUrl(repo?.owner?.html_url)
        ? repo.owner?.html_url || ""
        : "",
    },
  }));
};

const isValidUrl = (url: string | undefined | null): boolean => {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const parseDate = (dateString: string | undefined | null): Date | null => {
  if (!dateString) return null;

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
};
