import {
  axiosInstance as mockedAxiosInstance,
  mockRawUserProfile,
} from "@/tests/mocks";
jest.mock("@/services/axiosGithubInstance", () => mockedAxiosInstance);

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
      },
    });

    const repos = await githubService.searchRepos("nonexistentrepo");

    expect(repos).toEqual([]);
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

    expect(users).toEqual([mockUserProfile]);
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

    expect(users).toEqual([]);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });
});

describe("Github Service - getUserProfile", () => {
  beforeEach(() => {
    (mockedAxiosInstance.get as jest.Mock).mockClear();
  });

  it("should fetch user profile successfully", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockRawUserProfile,
    });

    const username = "mockuser";
    const profile = await githubService.getUserProfile(username);

    expect(profile).toEqual(mockUserProfile);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(`/users/${username}?page=1&per_page=30`);
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

  it("should obbey pagination options", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockUserProfile,
    });

    const username = "octocat";
    const options = { page: 2, perPage: 10 };
    await githubService.getUserProfile(username, options);

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `/users/${username}?page=${options.page}&per_page=${options.perPage}`
    );
  });
});

describe("Github Service - getUserStarredRepos", () => {
  beforeEach(() => {
    (mockedAxiosInstance.get as jest.Mock).mockClear();
  });

  it("should fetch starred repositories successfully", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockRepos,
    });

    const username = "octocat";
    const repos = await githubService.getUserStarredRepos(username);

    expect(repos).toEqual(mockRepos);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `/users/${username}/starred?page=1&per_page=30&type=all`
    );
  });

  it("should handle fetch error", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.getUserStarredRepos("octocat")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });

  it("should obbey pagination options", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockRepos,
    });

    const username = "octocat";
    const options = { page: 2, perPage: 10 };
    await githubService.getUserStarredRepos(username, options);

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `/users/${username}/starred?page=${options.page}&per_page=${options.perPage}&type=all`
    );
  });
});

describe("Github Service - getUserRepos", () => {
  beforeEach(() => {
    (mockedAxiosInstance.get as jest.Mock).mockClear();
  });

  it("should fetch user repositories successfully", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockRepos,
    });

    const username = "octocat";
    const repos = await githubService.getUserRepos(username);

    expect(repos).toEqual(mockRepos);
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `/users/${username}/repos?page=1&per_page=30&type=all`
    );
  });

  it("should handle fetch error", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error("GitHub API error: 500")
    );

    await expect(githubService.getUserRepos("octocat")).rejects.toThrow(
      "GitHub API error: 500"
    );
    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);
  });

  it("should obbey pagination options", async () => {
    (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockRepos,
    });

    const username = "octocat";
    const options = { page: 2, perPage: 10 };
    await githubService.getUserRepos(username, options);

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `/users/${username}/repos?page=${options.page}&per_page=${options.perPage}&type=all`
    );
  });
});
