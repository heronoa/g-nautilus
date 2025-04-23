import { IRepository, RepoFilters } from "@/types";

export function filterAndSortRepos(
  repos: IRepository[],
  filters: RepoFilters
): IRepository[] {
  let filtered = [...repos];

  if (filters.searchParam) {
    filtered = filterByName(filtered, filters.searchParam);
  }

  if (filters.language) {
    filtered = filterByLanguage(
      filtered,
      filters.language.split(",").map((lang) => lang.trim())
    );
  }

  if (filters.onlyForks) {
    filtered = filterByFork(filtered, true);
  }

  if (filters.onlyMirrors) {
    filtered = filterByMirror(filtered, true);
  }

  if (filters.onlySources) {
    filtered = filterBySource(filtered, true);
  }

  if (filters.onlyArchived) {
    filtered = filterByArchived(filtered, true);
  }

  if (filters.sortAnchor) {
    filtered = sortRepos(filtered, filters.sortAnchor);
  }

  return filtered;
}

export function filterByLanguage(
  repos: IRepository[],
  languages: string[]
): IRepository[] {
  if (languages.length === 0) return repos;
  return repos.filter((repo) =>
    languages.some(
      (lang) => repo.language?.toLowerCase() === lang.toLowerCase()
    )
  );
}

export function filterByFork(
  repos: IRepository[],
  onlyForks: boolean
): IRepository[] {
  if (!onlyForks) return repos;
  return repos.filter((repo) => repo.fork);
}

export function filterByMirror(
  repos: IRepository[],
  onlyMirrors: boolean
): IRepository[] {
  if (!onlyMirrors) return repos;
  return repos.filter(
    (repo) =>
      repo.fork === false &&
      repo.mirrorUrl !== undefined &&
      repo.mirrorUrl !== null
  );
}

export function filterBySource(
  repos: IRepository[],
  onlySources: boolean
): IRepository[] {
  if (!onlySources) return repos;
  return repos.filter((repo) => !repo.fork && !repo.mirrorUrl);
}

export function filterByArchived(
  repos: IRepository[],
  onlyArchived: boolean
): IRepository[] {
  if (!onlyArchived) return repos;
  return repos.filter((repo) => repo.archived);
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
        new Date(b.updatedAt ?? 0).getTime() -
        new Date(a.updatedAt ?? 0).getTime()
    );
  }
  return sortedRepos;
}
