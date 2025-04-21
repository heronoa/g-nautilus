import { normalizeRepos } from "@/utils/normalizeRepos";
import {
  IGithubSearchRepoDTO,
  IGithubSearchUserDTO,
  IGithubUserProfile,
  IPaginationReturn,
  IProfile,
  IQueryOptions,
  IRawRepository,
  IRepoQueryOptions,
  IRepository,
} from "@/types";
import axiosInstance from "./axiosGithubInstance";
import { normalizeProfiles } from "@/utils/normalizeProfiles";

export const githubService = {
  async searchRepos(
    query: string,
    options?: IQueryOptions
  ): Promise<IPaginationReturn<IRepository>> {
    try {
      const params = new URLSearchParams({
        ...(query ? { q: query } : {}),
        page: options?.page?.toString() || "1",
        per_page: options?.perPage?.toString() || "30",
      });
      const url = `/search/repositories${params.toString() ? `?${params.toString()}` : ""}`;

      const response = await axiosInstance.get(url);

      const rawData: IGithubSearchRepoDTO = await response.data;
      const repos = normalizeRepos(rawData.items);
      return {
        items: repos,
        totalCount: rawData.total_count,
      };
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },

  async searchUsers(
    query: string,
    options?: IQueryOptions
  ): Promise<IPaginationReturn<IProfile>> {
    try {
      const params = new URLSearchParams({
        ...(query && { q: query }),
        page: options?.page?.toString() || "1",
        per_page: options?.perPage?.toString() || "30",
      });
      const url = `/search/users${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await axiosInstance.get(url);
      const rawData: IGithubSearchUserDTO = await response.data;
      const users: IProfile[] = normalizeProfiles(rawData.items);
      return { items: users, totalCount: rawData.total_count };
    } catch (error: unknown) {
      throw error;
    }
  },

  async getUserProfile(
    username: string,
    options?: IQueryOptions
  ): Promise<IProfile> {
    try {
      const params = new URLSearchParams({
        page: options?.page?.toString() || "1",
        per_page: options?.perPage?.toString() || "30",
      });

      const url = `/users/${username}${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await axiosInstance.get(url);

      const userProfile: IGithubUserProfile = await response.data;

      const normalizeProfile: IProfile = normalizeProfiles([userProfile])[0];

      return normalizeProfile;
    } catch (error) {
      throw error;
    }
  },

  async getUserStarredRepos(
    username: string,
    options?: IRepoQueryOptions
  ): Promise<IRepository[]> {
    try {
      const params = new URLSearchParams({
        ...(options?.language && {
          q: `language:${options?.language}`,
        }),
        page: options?.page?.toString() || "1",
        per_page: options?.perPage?.toString() || "30",
        type: options?.type || "all",
      });

      const url = `/users/${username}/starred${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await axiosInstance.get(url);
      const starredRepos: IRawRepository[] = await response.data;
      const normalizedStarredRepos: IRepository[] =
        normalizeRepos(starredRepos);

      return normalizedStarredRepos;
    } catch (error) {
      throw error;
    }
  },

  async getUserRepos(
    username: string,
    options?: IRepoQueryOptions
  ): Promise<IRepository[]> {
    try {
      const params = new URLSearchParams({
        ...(options?.language && {
          q: `language:${options?.language}`,
        }),
        page: options?.page?.toString() || "1",
        per_page: options?.perPage?.toString() || "30",
        type: options?.type || "all",
      });

      const url = `/users/${username}/repos${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await axiosInstance.get(url);
      const repos: IRawRepository[] = await response.data;
      const normalizedRepos: IRepository[] = normalizeRepos(repos);
      return normalizedRepos;
    } catch (error) {
      throw error;
    }
  },
};
