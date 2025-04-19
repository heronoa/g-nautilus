import { normalizeRepos } from "@/utils/normalizeRepos";
import { IGithubUserProfile, IRawRepository, IRepository } from "@/types";
import { C } from "@/utils";
import axiosInstance from "./axiosInstance";

interface queryOptions {
  page?: number;
  perPage?: number;
}

export const githubService = {
  async searchRepos(
    query: string,
    options?: queryOptions
  ): Promise<IRepository[]> {
    try {
      const url = `${C.GITHUB_API_URL}/search/repositories?q=${query}${options ? `&page=${options?.page}&per_page=${options?.perPage}` : ""}`;

      const response = await axiosInstance.get(url);

      const rawData: { items: IRawRepository[] } = await response.data;
      return normalizeRepos(rawData.items);
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },

  async getUserProfile(
    username: string,
    options?: queryOptions
  ): Promise<IGithubUserProfile> {
    try {
      const url = `${C.GITHUB_API_URL}/users/${username}${options ? `?page=${options?.page}&per_page=${options?.perPage}` : ""}`;
      const response = await axiosInstance.get(url);

      const userProfile: IGithubUserProfile = await response.data;
      console.log({ response, userProfile });

      return userProfile;
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },

  async getUserStarredRepos(
    username: string,
    options?: queryOptions
  ): Promise<IRawRepository[]> {
    try {
      const url = `${C.GITHUB_API_URL}/users/${username}/starred${options ? `?page=${options?.page}&per_page=${options?.perPage}` : ""}`;
      const response = await axiosInstance.get(url);
      const starredRepos: IRawRepository[] = await response.data;

      return starredRepos;
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },

  async getUserRepos(
    username: string,
    options?: queryOptions
  ): Promise<IRawRepository[]> {
    try {
      const url = `${C.GITHUB_API_URL}/users/${username}/repos${options ? `?page=${options?.page}&per_page=${options?.perPage}` : ""}`;
      const response = await axiosInstance.get(url);
      const repos: IRawRepository[] = await response.data;

      return repos;
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },
};
