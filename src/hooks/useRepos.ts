import { useQuery } from "@tanstack/react-query";
import { githubService } from "../services/githubService";
import { IRepository } from "../types";

interface UseReposOptions {
  username: string;
  type?: "owner" | "starred";
  page?: number;
  perPage?: number;
}

export const useRepos = ({
  username,
  type = "owner",
  page = 1,
  perPage = 30,
}: UseReposOptions) => {
  const repoFn =
    type === "starred"
      ? githubService.getUserStarredRepos
      : githubService.getUserRepos;

  return useQuery<IRepository[], Error>({
    queryKey: ["repos", username, type, page, perPage],
    queryFn: () => repoFn(username, { page, perPage }),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
