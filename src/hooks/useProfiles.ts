import { useQuery } from "@tanstack/react-query";
import { githubService } from "../services/githubService";
import { IProfile } from "../types";

export const useProfile = (
  username: string,
  options?: { page?: number; perPage?: number }
) => {
  return useQuery<IProfile, Error>({
    queryKey: ["profile", username, options],
    queryFn: () => githubService.getUserProfile(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
