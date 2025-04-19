import { githubService } from "@/services/githubService";
import { mockRepos } from "@/tests/mocks";

describe("searchRepos", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear(); // Limpa o mock a cada teste
  });

  it("should fetch repositories successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce({ items: mockRepos }),
    });

    const repos = await githubService.searchRepos("react");

    expect(repos).toEqual(mockRepos);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/search/repositories?q=react"
    );
  });

  it("should handle fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await expect(githubService.searchRepos("react")).rejects.toThrow(
      "API Error"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return empty array when no repos are found", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce({ items: [] }),
    });

    const repos = await githubService.searchRepos("nonexistentrepo");

    expect(repos).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
