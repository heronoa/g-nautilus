import { normalizeRepos } from "@/utils/normalizeRepos";
import {
  IGithubSearchRepoDTO,
  IGithubSearchUserDTO,
  IGithubUserProfile,
  IRawRepository,
  IRepository,
} from "@/types";
import axiosInstance from "./axiosGithubInstance";

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
      const url = `/search/repositories?q=${query}${options ? `&page=${options?.page}&per_page=${options?.perPage}` : ""}`;

      const response = await axiosInstance.get(url);

      const rawData: IGithubSearchRepoDTO = await response.data;
      return normalizeRepos(rawData.items);
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },

  async searchUsers(
    query: string,
    options?: queryOptions
  ): Promise<IGithubUserProfile[]> {
    try {
      const url = `/search/users?q=${query}${options ? `&page=${options?.page}&per_page=${options?.perPage}` : ""}`;
      const response = await axiosInstance.get(url);
      const rawData: IGithubSearchUserDTO = await response.data;
      const users: IGithubUserProfile[] = rawData.items;
      return users;
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },

  async getUserProfile(
    username: string,
    options?: queryOptions
  ): Promise<IGithubUserProfile> {
    try {
      const url = `/users/${username}${options ? `?page=${options?.page}&per_page=${options?.perPage}` : ""}`;
      const response = await axiosInstance.get(url);

      const userProfile: IGithubUserProfile = await response.data;

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
      const url = `/users/${username}/starred${options ? `?page=${options?.page}&per_page=${options?.perPage}` : ""}`;
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
      const url = `/users/${username}/repos${options ? `?page=${options?.page}&per_page=${options?.perPage}` : ""}`;
      const response = await axiosInstance.get(url);
      const repos: IRawRepository[] = await response.data;

      return repos;
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },
};
