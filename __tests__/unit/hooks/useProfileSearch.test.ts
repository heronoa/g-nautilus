import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { useProfileSearch } from "@/hooks/useProfileSearch";
import { githubService } from "@/services/githubService";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/githubService", () => ({
  githubService: {
    searchUsers: jest.fn(),
  },
}));

describe("useProfileSearch", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockSearchUsers = githubService.searchUsers as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useQuery with the correct parameters", () => {
    const query = "testquery";
    const options = { page: 1, perPage: 30 };

    renderHook(() => useProfileSearch({ query, ...options }));

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: [query, options.page, options.perPage],
      queryFn: expect.any(Function),
      enabled: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  });

  it("should disable the query if query is not provided", () => {
    renderHook(() => useProfileSearch({ query: "" }));

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("should call githubService.searchUsers with the correct arguments", async () => {
    const query = "testquery";
    const options = { page: 1, perPage: 30 };

    mockUseQuery.mockImplementation(({ queryFn }) => {
      queryFn();
      return {};
    });

    renderHook(() => useProfileSearch({ query, ...options }));

    expect(mockSearchUsers).toHaveBeenCalledWith(query, options);
  });

  it("should handle errors from githubService.searchUsers", async () => {
    const query = "testquery";
    const error = new Error("Failed to fetch profiles");

    mockSearchUsers.mockRejectedValueOnce(error);

    mockUseQuery.mockImplementation(() => {
      return { error };
    });

    const { result } = renderHook(() => useProfileSearch({ query }));

    expect(result.current.error).toBe(error);
  });

  it("should use cached data if available", async () => {
    const query = "testquery";
    const cachedData = [
      { id: 1, name: "Cached User 1" },
      { id: 2, name: "Cached User 2" },
    ];

    mockUseQuery.mockReturnValueOnce({
      data: cachedData,
      isFetching: false,
    });

    const { result } = renderHook(() => useProfileSearch({ query }));

    expect(result.current.data).toBe(cachedData);
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: [query, 1, 30],
      })
    );
  });
});
