import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { githubService } from "../services/githubService";
import { IProfile } from "../types";
interface UseSearchOptions {
  query: string;
  page?: number;
  perPage?: number;
}

export function useProfileSearch({
  query,
  page = 1,
  perPage = 30,
}: UseSearchOptions): UseQueryResult<IProfile[], Error> {
  const queryKey = [query, page, perPage];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => githubService.searchUsers(query, { page, perPage }),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
