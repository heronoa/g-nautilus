import { normalizeRepos } from "@/utils/normalizeRepos";
import { IRawRepository, IRepository } from "@/types";
import { C } from "@/utils";
import axiosInstance from "./axiosInstance";

export const githubService = {
  async searchRepos(query: string): Promise<IRepository[]> {
    try {
      const url = `${C.GITHUB_API_URL}/search/repositories?q=${query}`;

      const response = await axiosInstance.get(url);

      console.log({ response, url });

      const rawData: { items: IRawRepository[] } = await response.data;
      return normalizeRepos(rawData.items);
    } catch (error) {
      throw new Error(`GitHub API error: ${error}`);
    }
  },
};
