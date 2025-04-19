import { normalizeRepos } from "@/utils/normalizeRepos";
import { IRawRepository, IRepository } from "@/types";
import { C } from "@/utils";

export const githubService = {
  async searchRepos(query: string): Promise<IRepository[]> {
    const url = `${C.GITHUB_API_URL}/search/repositories?q=${query}`;

    const response = await fetch(url);
    console.log({ response });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const rawData: { items: IRawRepository[] } = await response.json();
    return normalizeRepos(rawData.items);
  },
};
