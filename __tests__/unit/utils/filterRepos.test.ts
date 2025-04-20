import { filterByName, sortRepos } from "@/utils/filterRepos";
import { mockRepos } from "@/tests/mocks";

describe("Repository filtering and sorting functions", () => {
  describe("filterByName", () => {
    it("should return repositories that contain the search term in the name", () => {
      const result = filterByName(mockRepos, "repo-1");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("repo-1");
    });

    it("should return repositories ignoring case sensitivity", () => {
      const result = filterByName(mockRepos, "Repo-1");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("repo-1");
    });

    it("should return an empty array when no repositories match the search term", () => {
      const result = filterByName(mockRepos, "non-existent-repo");
      expect(result).toHaveLength(0);
    });
  });

  describe("sortRepos", () => {
    it("should sort repositories by stars in descending order", () => {
      const result = sortRepos(mockRepos, "stars");
      expect(result[0].stargazers_count).toBeGreaterThanOrEqual(
        result[1].stargazers_count
      );
    });

    it("should sort repositories by updated date in descending order", () => {
      const result = sortRepos(mockRepos, "updated");
      expect(result[0].updatedAt?.getTime() ?? 0).toBeGreaterThanOrEqual(
        result[1].updatedAt?.getTime() ?? 0
      );
    });

    it("should return the same array if the sorting criteria is invalid", () => {
      const result = sortRepos(mockRepos, "invalid" as never);
      expect(result).toEqual(mockRepos);
    });
  });
});
