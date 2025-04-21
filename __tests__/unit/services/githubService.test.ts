import {
  axiosInstance as mockedAxiosInstance,
  mockRawRepos,
  mockRawUserProfile,
} from "@/tests/mocks";

jest.mock("@/services/axiosGithubInstance", () => mockedAxiosInstance);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

import { githubService } from "@/services/githubService";
import { mockRepos, mockUserProfile } from "@/tests/mocks";
import { C } from "@/utils";
import { IRepository } from "@/types";
import { mockRawIssues, mockNormalizedIssues } from "@/tests/mocks/issues";

describe("Github Service - searchRepos", () => {
  beforeEach(() => {
    (mockedAxiosInstance.get as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockClear();
  });

  it("should fetch repositories successfully", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: mockRawRepos,
        total_count: mockRawRepos.length,
      },
    });

    const repos = await githubService.searchRepos("react");

    expect(repos.items).toEqual(mockRepos);
    expect(repos.totalCount).toEqual(3);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      "/search/repositories?q=react&page=1&per_page=30"
    );
  });

  it("should handle fetch error", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.searchRepos("react")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });

  it("should return empty array when no repos are found", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: [],
        total_count: 0,
      },
    });

    const repos = await githubService.searchRepos("nonexistentrepo");

    expect(repos.items).toEqual([]);
    expect(repos.totalCount).toEqual(0);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });
});

describe("Github Service - searchUsers", () => {
  beforeEach(() => {
    (mockedAxiosInstance.get as jest.Mock).mockClear();
  });
  it("should fetch users successfully", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: [mockRawUserProfile],
      },
    });

    const users = await githubService.searchUsers("octocat");

    expect(users.items).toEqual([mockUserProfile]);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      "/search/users?q=octocat&page=1&per_page=30"
    );
  });

  it("should handle fetch error", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.searchUsers("octocat")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });

  it("should return empty array when no users are found", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: [],
      },
    });

    const users = await githubService.searchUsers("nonexistentuser");

    expect(users.items).toEqual([]);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });
});

describe("Github Service - getUserProfile", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("should fetch user profile successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockRawUserProfile,
    });

    const username = "mockuser";
    const profile = await githubService.getUserProfile(username);

    expect(profile).toEqual(mockUserProfile);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${C.githubApiUrl}/users/${username}`,
      {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${C.githubApiToken}`,
          "Content-Type": "application/json",
          "User-Agent": "g-nautilus",
        },
        next: { revalidate: 60 },
        redirect: "follow",
      }
    );
  });

  it("should handle fetch error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.getUserProfile("octocat")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should obbey pagination options", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockRawUserProfile,
    });

    const username = "octocat";
    await githubService.getUserProfile(username);

    expect(global.fetch).toHaveBeenCalledWith(
      `${C.githubApiUrl}/users/${username}`,
      {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${C.githubApiToken}`,
          "Content-Type": "application/json",
          "User-Agent": "g-nautilus",
        },
        next: { revalidate: 60 },
        redirect: "follow",
      }
    );
  });
});

describe("Github Service - getUserStarredRepos", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch starred repositories successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockRawRepos,
    });

    const username = "octocat";
    const repos = await githubService.getUserStarredRepos(username);

    expect(repos).toEqual(mockRepos);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${C.githubApiUrl}/users/${username}/starred?page=1&per_page=30&type=all`,
      {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${C.githubApiToken}`,
          "Content-Type": "application/json",
          "User-Agent": "g-nautilus",
        },
        next: { revalidate: 60 },
        redirect: "follow",
      }
    );
  });

  it("should handle fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.getUserStarredRepos("octocat")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should obbey pagination options", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockRepos,
    });

    const username = "octocat";
    const options = { page: 2, perPage: 10 };
    await githubService.getUserStarredRepos(username, options);

    expect(fetch).toHaveBeenCalledWith(
      `${C.githubApiUrl}/users/${username}/starred?page=${options.page}&per_page=${options.perPage}&type=all`,
      {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${C.githubApiToken}`,
          "Content-Type": "application/json",
          "User-Agent": "g-nautilus",
        },
        next: { revalidate: 60 },
        redirect: "follow",
      }
    );
  });
});

describe("Github Service - getUserRepos", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch user repositories successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockRawRepos,
    });

    const username = "octocat";
    const repos = await githubService.getUserRepos(username);

    expect(repos).toEqual(mockRepos);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${C.githubApiUrl}/users/${username}/repos?page=1&per_page=30&type=all`,
      {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${C.githubApiToken}`,
          "Content-Type": "application/json",
          "User-Agent": "g-nautilus",
        },
        next: { revalidate: 60 },
        redirect: "follow",
      }
    );
  });

  it("should handle fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.getUserRepos("octocat")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should obbey pagination options", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockRepos,
    });

    const username = "octocat";
    const options = { page: 2, perPage: 10 };
    await githubService.getUserRepos(username, options);

    expect(fetch).toHaveBeenCalledWith(
      `${C.githubApiUrl}/users/${username}/repos?page=${options.page}&per_page=${options.perPage}&type=all`,
      {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${C.githubApiToken}`,
          "Content-Type": "application/json",
          "User-Agent": "g-nautilus",
        },
        next: { revalidate: 60 },
        redirect: "follow",
      }
    );
  });
});

describe("Github Service - getRepo", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch a repository successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockRawRepos[0],
    });

    const username = "octocat";
    const repoName = "repo";

    const repo = await githubService.getRepo(username, repoName);

    expect(repo).toEqual(mockRepos[0]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${C.githubApiUrl}/repos/${username}/${repoName}`,
      {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${C.githubApiToken}`,
          "Content-Type": "application/json",
          "User-Agent": "g-nautilus",
        },
        next: { revalidate: 60 },
        redirect: "follow",
      }
    );
  });

  it("should handle fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.getRepo("octocat", "repo")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("Github Service - getAllUserRepos", () => {
  beforeEach(() => {
    jest
      .spyOn(githubService, "getUserRepos")
      .mockImplementation(async (_username: string, options) => {
        const perPage = options?.perPage || 30;
        const page = options?.page || 1;

        if (page === 1) {
          return Array.from({ length: perPage }, (_, i) => ({
            id: i + 1,
            name: `Repo${i + 1}`,
          })) as IRepository[];
        } else if (page === 2) {
          return Array.from({ length: 10 }, (_, i) => ({
            id: i + 31,
            name: `Repo${i + 31}`,
          })) as IRepository[];
        } else {
          return [];
        }
      });
  });

  it("deve buscar todos os repositórios paginados de um usuário", async () => {
    const allRepos = await githubService.getAllUserRepos("usuarioTeste");

    expect(githubService.getUserRepos).toHaveBeenCalledTimes(2);
    expect(githubService.getUserRepos).toHaveBeenCalledWith("usuarioTeste", {
      perPage: 30,
      page: 1,
    });
    expect(githubService.getUserRepos).toHaveBeenCalledWith("usuarioTeste", {
      perPage: 30,
      page: 2,
    });

    expect(allRepos.items).toHaveLength(40);
    expect(allRepos.totalCount).toBe(40);
    expect(allRepos.items[0].name).toBe("Repo1");
    expect(allRepos.items[39].name).toBe("Repo40");
  });
});

describe("Github Service - getIssues", () => {
  describe("Github Service - getIssues", () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockClear();
    });

    it("should fetch issues successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockRawIssues,
      });

      const username = "octocat";
      const repoName = "repo";
      const issues = await githubService.getIssues(username, repoName);

      expect(issues).toEqual(mockNormalizedIssues);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${C.githubApiUrl}/repos/${username}/${repoName}/issues`,
        {
          cache: "force-cache",
          headers: {
            Authorization: `Bearer ${C.githubApiToken}`,
            "Content-Type": "application/json",
            "User-Agent": "g-nautilus",
          },
          next: { revalidate: 60 },
          redirect: "follow",
        }
      );
    });

    it("should handle fetch error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(
        new Error("GitHub API error: 500")
      );

      await expect(githubService.getIssues("octocat", "repo")).rejects.toThrow(
        "GitHub API error: 500"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should return an empty array when no issues are found", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [],
      });

      const username = "octocat";
      const repoName = "repo";
      const issues = await githubService.getIssues(username, repoName);

      expect(issues).toEqual([]);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${C.githubApiUrl}/repos/${username}/${repoName}/issues`,
        {
          cache: "force-cache",
          headers: {
            Authorization: `Bearer ${C.githubApiToken}`,
            "Content-Type": "application/json",
            "User-Agent": "g-nautilus",
          },
          next: { revalidate: 60 },
          redirect: "follow",
        }
      );
    });
  });
});
