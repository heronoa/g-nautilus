import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { useRepos } from "@/hooks/useRepos";
import { githubService } from "@/services/githubService";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/githubService", () => ({
  githubService: {
    getUserRepos: jest.fn(),
    getUserStarredRepos: jest.fn(),
  },
}));

describe("useRepos", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockGetUserRepos = githubService.getUserRepos as jest.Mock;
  const mockGetUserStarredRepos =
    githubService.getUserStarredRepos as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useQuery with the correct parameters for owner repos", () => {
    const username = "testuser";
    const options: {
      type: "owner" | "starred";
      page: number;
      perPage: number;
    } = { type: "owner", page: 1, perPage: 30 };

    renderHook(() => useRepos({ username, ...options }));

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: [
        "repos",
        username,
        options.type,
        options.page,
        options.perPage,
      ],
      queryFn: expect.any(Function),
      enabled: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  });

  it("should call useQuery with the correct parameters for starred repos", () => {
    const username = "testuser";
    const options: {
      type: "owner" | "starred";
      page: number;
      perPage: number;
    } = { type: "starred", page: 1, perPage: 30 };

    renderHook(() => useRepos({ username, ...options }));

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: [
        "repos",
        username,
        options.type,
        options.page,
        options.perPage,
      ],
      queryFn: expect.any(Function),
      enabled: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  });

  it("should disable the query if username is not provided", () => {
    renderHook(() => useRepos({ username: "" }));

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("should call githubService.getUserRepos with the correct arguments for owner repos", async () => {
    const username = "testuser";
    const options: {
      type: "owner" | "starred";
      page: number;
      perPage: number;
    } = { type: "owner", page: 1, perPage: 30 };

    mockUseQuery.mockImplementation(({ queryFn }) => {
      queryFn();
      return {};
    });

    renderHook(() => useRepos({ username, ...options }));

    expect(mockGetUserRepos).toHaveBeenCalledWith(username, {
      page: options.page,
      perPage: options.perPage,
    });
  });

  it("should call githubService.getUserStarredRepos with the correct arguments for starred repos", async () => {
    const username = "testuser";
    const options: {
      type: "owner" | "starred";
      page: number;
      perPage: number;
    } = { type: "starred", page: 1, perPage: 30 };

    mockUseQuery.mockImplementation(({ queryFn }) => {
      queryFn();
      return {};
    });

    renderHook(() => useRepos({ username, ...options }));

    expect(mockGetUserStarredRepos).toHaveBeenCalledWith(username, {
      page: options.page,
      perPage: options.perPage,
    });
  });

  it("should handle errors from githubService.getUserRepos", async () => {
    const username = "testuser";
    const error = new Error("Failed to fetch repos");

    mockGetUserRepos.mockRejectedValueOnce(error);

    mockUseQuery.mockImplementation(() => {
      return { error };
    });

    const { result } = renderHook(() => useRepos({ username }));

    expect(result.current.error).toBe(error);
  });

  it("should use cached data if available", async () => {
    const username = "testuser";
    const cachedData = [
      { id: 1, name: "Cached Repo 1" },
      { id: 2, name: "Cached Repo 2" },
    ];

    mockUseQuery.mockReturnValueOnce({
      data: cachedData,
      isFetching: false,
    });

    const { result } = renderHook(() => useRepos({ username }));

    expect(result.current.data).toBe(cachedData);
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["repos", username, "owner", 1, 30],
      })
    );
  });
});
