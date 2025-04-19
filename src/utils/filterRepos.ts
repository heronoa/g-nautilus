import { IRepository } from "@/types";

export function filterByLanguage(
  repos: IRepository[],
  language: string
): IRepository[] {
  if (language === "All") {
    return repos;
  }
  return repos.filter((repo) => repo.language === language);
}

export function filterByName(
  repos: IRepository[],
  searchParam: string
): IRepository[] {
  return repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchParam.toLowerCase())
  );
}

export function sortRepos(
  repos: IRepository[],
  anchor: "stars" | "updated"
): IRepository[] {
  const sortedRepos = [...repos];
  if (anchor === "stars") {
    return sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }
  if (anchor === "updated") {
    return sortedRepos.sort(
      (a, b) =>
        new Date(b.updated_at ?? 0).getTime() -
        new Date(a.updated_at ?? 0).getTime()
    );
  }
  return sortedRepos;
}
