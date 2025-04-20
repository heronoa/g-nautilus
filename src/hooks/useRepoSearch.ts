import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { githubService } from "../services/githubService";
import { IRepository } from "../types";
interface UseSearchOptions {
  query: string;
  page?: number;
  perPage?: number;
  user?: string;
}

export function useReposSearch({
  query,
  user,
  page = 1,
  perPage = 30,
}: UseSearchOptions): UseQueryResult<IRepository[], Error> {
  const queryKey = [query, page, perPage];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => githubService.searchRepos(query, { page, perPage, user }),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
