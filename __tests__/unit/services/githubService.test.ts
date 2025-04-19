import { axiosInstance as mockedAxiosInstance } from "@/tests/mocks";
jest.mock("@/services/axiosInstance", () => mockedAxiosInstance);

import { githubService } from "@/services/githubService";
import { mockRepos, mockUserProfile } from "@/tests/mocks";

describe("Github Service - searchRepos", () => {
  beforeEach(() => {
    (mockedAxiosInstance.get as jest.Mock).mockClear();
  });

  it("should fetch repositories successfully", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: mockRepos,
      },
    });

    const repos = await githubService.searchRepos("react");

    expect(repos).toEqual(mockRepos);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      "https://api.github.com/search/repositories?q=react"
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
      },
    });

    const repos = await githubService.searchRepos("nonexistentrepo");

    expect(repos).toEqual([]);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });
});

describe("Github Service - getUserProfile", () => {
  beforeEach(() => {
    (mockedAxiosInstance.get as jest.Mock).mockClear();
  });

  it("should fetch user profile successfully", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockUserProfile,
    });

    const username = "octocat";
    const profile = await githubService.getUserProfile(username);

    expect(profile).toEqual(mockUserProfile);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `https://api.github.com/users/${username}`
    );
  });

  it("should handle fetch error", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.getUserProfile("octocat")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });
});
