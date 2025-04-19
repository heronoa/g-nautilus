import { normalizeRepos } from "@/utils/normalizeRepos";
import { IGithubUserProfile, IRawRepository, IRepository } from "@/types";
import { C } from "@/utils";
import axiosInstance from "./axiosInstance";

export const githubService = {
  async searchRepos(query: string): Promise<IRepository[]> {
    try {
      const url = `${C.GITHUB_API_URL}/search/repositories?q=${query}`;

      const response = await axiosInstance.get(url);

      const rawData: { items: IRawRepository[] } = await response.data;
      return normalizeRepos(rawData.items);
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },

  async getUserProfile(username: string): Promise<IGithubUserProfile> {
    try {
      const url = `${C.GITHUB_API_URL}/users/${username}`;
      const response = await axiosInstance.get(url);

      const userProfile: IGithubUserProfile = await response.data;
      console.log({ response, userProfile });

      return userProfile;
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },
};
