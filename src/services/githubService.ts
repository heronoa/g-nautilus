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
import fetchWithCache from "./fetchCache";

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

  async getUserProfile(username: string): Promise<IProfile> {
    try {
      const url = `/users/${username}`;

      const response = await fetchWithCache(url);

      const userProfile = (await response.data) as IGithubUserProfile;

      const normalizeProfile: IProfile = normalizeProfiles([userProfile])[0];

      return normalizeProfile;
    } catch (error) {
      console.error(error);
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
      const response = await fetchWithCache<IRawRepository[]>(url);
      const starredRepos = response.data;
      const normalizedStarredRepos: IRepository[] =
        normalizeRepos(starredRepos);

      return normalizedStarredRepos;
    } catch (error) {
      throw error;
    }
  },

  async getRepo(username: string) {
    try {
      const url = `/repos/${username}`;
      const response = await fetchWithCache<IRawRepository>(url);
      const repo = response.data;
      const normalizedRepo: IRepository = normalizeRepos([repo])[0];
      return normalizedRepo;
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
      const response = await fetchWithCache<IRawRepository[]>(url);
      const repos: IRawRepository[] = response.data;
      const normalizedRepos: IRepository[] = normalizeRepos(repos);
      return normalizedRepos;
    } catch (error) {
      throw error;
    }
  },

  async getAllUserRepos(
    username: string
  ): Promise<IPaginationReturn<IRepository>> {
    const allRepos: IRepository[] = [];
    let page = 1;
    const perPage = 30;

    while (true) {
      const paginatedRepos = await this.getUserRepos(username, {
        page,
        perPage,
      });

      allRepos.push(...paginatedRepos);

      if (paginatedRepos.length < perPage) break;

      page++;
    }

    const paginatedReturn = allRepos.reduce(
      (acc: IPaginationReturn<IRepository>, repo: IRepository) => {
        acc.items.push(repo);
        acc.totalCount += 1;
        return acc;
      },
      { items: [], totalCount: 0 }
    );

    return paginatedReturn;
  },

  async getAllUserStarredRepos(
    username: string
  ): Promise<IPaginationReturn<IRepository>> {
    const allStarredRepos: IRepository[] = [];
    let page = 1;
    const perPage = 30;
    while (true) {
      const paginatedStarredRepos = await this.getUserStarredRepos(username, {
        page,
        perPage,
      });
      allStarredRepos.push(...paginatedStarredRepos);
      if (paginatedStarredRepos.length < perPage) break;
      page++;
    }

    const paginatedReturn = allStarredRepos.reduce(
      (acc: IPaginationReturn<IRepository>, repo: IRepository) => {
        acc.items.push(repo);
        acc.totalCount += 1;
        return acc;
      },
      { items: [], totalCount: 0 }
    );

    return paginatedReturn;
  },
};
