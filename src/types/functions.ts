export interface RepoFilters {
  language?: string;
  searchParam?: string;
  onlyForks?: boolean;
  onlyMirrors?: boolean;
  onlySources?: boolean;
  onlyArchived?: boolean;
  sortAnchor?: "stars" | "updated";
}

export interface IQueryOptions {
  page?: number;
  perPage?: number;
  language?: string;
  user?: string;
  sort?: string;
  direction?: string;
}

export interface IRepoQueryOptions extends IQueryOptions {
  type?: "all" | "owner" | "member";
}
