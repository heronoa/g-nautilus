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
import { normalizeProfiles, normalizeIssue, normalizeRepos } from "@/utils";
import fetchWithCache from "./fetchCache";
import { IIssue, IRawIssue } from "@/types/issues";

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
      console.log("Github Service - userProfile error", error);
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
      console.log("Github Service - getUserStarredRepos error", error);
      throw error;
    }
  },

  async getRepo(username: string, repoName: string): Promise<IRepository> {
    try {
      const url = `/repos/${username}/${repoName}`;
      const response = await fetchWithCache<IRawRepository>(url);
      const repo = response.data;
      const normalizedRepo: IRepository = normalizeRepos([repo])[0];
      return normalizedRepo;
    } catch (error) {
      console.log("Github Service - getRepo error", error);
      throw error;
    }
  },

  async getIssues(
    username: string,
    repoName: string,
    options?: IRepoQueryOptions
  ): Promise<IIssue[]> {
    try {
      const params = new URLSearchParams({
        ...(options?.language && {
          q: `language:${options?.language}`,
        }),
        page: options?.page?.toString() || "1",
        per_page: options?.perPage?.toString() || "30",
      });

      const url = `/repos/${username}/${repoName}/issues${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetchWithCache<IRawIssue[]>(url);
      const issues = response.data;
      const normalizedIssues: IIssue[] = normalizeIssue(issues);
      return normalizedIssues;
    } catch (error) {
      console.log("Github Service - getIssues error", error);
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
    try {
      const maxPage = 4;
      const allRepos: IRepository[] = [];
      let page = 1;
      const perPage = 30;

      while (true) {
        const paginatedRepos = await this.getUserRepos(username, {
          page,
          perPage,
        });

        allRepos.push(...paginatedRepos);

        if (paginatedRepos.length < perPage || page === maxPage) break;
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
    } catch (error) {
      console.error("Github Service - getAllUserRepos error", error);
      throw error;
    }
  },

  async getAllUserStarredRepos(
    username: string
  ): Promise<IPaginationReturn<IRepository>> {
    const maxPage = 4;
    const allStarredRepos: IRepository[] = [];
    let page = 1;
    const perPage = 30;
    while (true) {
      const paginatedStarredRepos = await this.getUserStarredRepos(username, {
        page,
        perPage,
      });
      allStarredRepos.push(...paginatedStarredRepos);
      if (paginatedStarredRepos.length < perPage || page === maxPage) break;
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

  async getAllIssues(
    username: string,
    repoName: string
  ): Promise<IPaginationReturn<IIssue>> {
    const maxPage = 4;
    const allIssues: IIssue[] = [];
    let page = 1;
    const perPage = 30;

    while (true) {
      const paginatedIssues = await this.getIssues(username, repoName, {
        page,
        perPage,
      });

      allIssues.push(...paginatedIssues);

      if (paginatedIssues.length < perPage || page === maxPage) break;

      page++;
    }

    const paginatedReturn = allIssues.reduce(
      (acc: IPaginationReturn<IIssue>, issue: IIssue) => {
        acc.items.push(issue);
        acc.totalCount += 1;
        return acc;
      },
      { items: [], totalCount: 0 }
    );

    return paginatedReturn;
  },
};
