import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/useProfiles";
import { githubService } from "@/services/githubService";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/githubService", () => ({
  githubService: {
    getUserProfile: jest.fn(),
  },
}));

describe("useProfile", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockGetUserProfile = githubService.getUserProfile as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useQuery with the correct parameters", () => {
    const username = "testuser";
    const options = { page: 1, perPage: 10 };

    renderHook(() => useProfile(username, options));

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["profile", username, options],
      queryFn: expect.any(Function),
      enabled: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  });

  it("should disable the query if username is not provided", () => {
    renderHook(() => useProfile(""));

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("should call githubService.getUserProfile with the correct arguments", async () => {
    const username = "testuser";
    const options = { page: 1, perPage: 10 };

    mockUseQuery.mockImplementation(({ queryFn }) => {
      queryFn();
      return {};
    });

    renderHook(() => useProfile(username, options));

    expect(mockGetUserProfile).toHaveBeenCalledWith(username, options);
  });

  it("should handle errors from githubService.getUserProfile", async () => {
    const username = "testuser";
    const error = new Error("Failed to fetch profile");

    mockGetUserProfile.mockRejectedValueOnce(error);

    mockUseQuery.mockImplementation(() => {
      return { error };
    });

    const { result } = renderHook(() => useProfile(username));

    expect(result.current.error).toBe(error);
  });

  it("should use cached data if available", async () => {
    const username = "testuser";
    const cachedData = { name: "Cached User", bio: "This is cached data" };

    mockUseQuery.mockReturnValueOnce({
      data: cachedData,
      isFetching: false,
    });

    const { result } = renderHook(() => useProfile(username));

    expect(result.current.data).toBe(cachedData);
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["profile", username, undefined],
      })
    );
  });
});
