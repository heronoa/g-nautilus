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
  describe("Github Service - getRepo", () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockClear();
    });

    it("should fetch a repository successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockRawRepos[0],
      });

      const username = "octocat/repo";
      const repo = await githubService.getRepo(username);

      expect(repo).toEqual(mockRepos[0]);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${C.githubApiUrl}/repos/${username}`,
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

      await expect(githubService.getRepo("octocat/repo")).rejects.toThrow(
        "GitHub API error: 500"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
