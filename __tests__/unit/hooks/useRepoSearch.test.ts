import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { useReposSearch } from "@/hooks/useRepoSearch";
import { githubService } from "@/services/githubService";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/githubService", () => ({
  githubService: {
    searchRepos: jest.fn(),
  },
}));

describe("useReposSearch", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockSearchRepos = githubService.searchRepos as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useQuery with the correct parameters", () => {
    const query = "testrepo";
    const options = { page: 1, perPage: 30 };

    renderHook(() => useReposSearch({ query, ...options }));

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: [query, options.page, options.perPage],
      queryFn: expect.any(Function),
      enabled: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  });

  it("should disable the query if query is not provided", () => {
    renderHook(() => useReposSearch({ query: "" }));

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("should call githubService.searchRepos with the correct arguments", async () => {
    const query = "testrepo";
    const options = { page: 1, perPage: 30 };

    mockUseQuery.mockImplementation(({ queryFn }) => {
      queryFn();
      return {};
    });

    renderHook(() => useReposSearch({ query, ...options }));

    expect(mockSearchRepos).toHaveBeenCalledWith(query, options);
  });

  it("should handle errors from githubService.searchRepos", async () => {
    const query = "testrepo";
    const error = new Error("Failed to fetch repositories");

    mockSearchRepos.mockRejectedValueOnce(error);

    mockUseQuery.mockImplementation(() => {
      return { error };
    });

    const { result } = renderHook(() => useReposSearch({ query }));

    expect(result.current.error).toBe(error);
  });

  it("should use cached data if available", async () => {
    const query = "testrepo";
    const cachedData = [
      { id: 1, name: "Cached Repo 1" },
      { id: 2, name: "Cached Repo 2" },
    ];

    mockUseQuery.mockReturnValueOnce({
      data: cachedData,
      isFetching: false,
    });

    const { result } = renderHook(() => useReposSearch({ query }));

    expect(result.current.data).toBe(cachedData);
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: [query, 1, 30],
      })
    );
  });
});
