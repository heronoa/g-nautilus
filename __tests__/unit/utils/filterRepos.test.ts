import {
  filterByFork,
  filterByMirror,
  filterBySource,
  filterByArchived,
  filterAndSortRepos,
  sortRepos,
} from "@/utils/filterRepos";
import { mockRepos } from "@/tests/mocks";
import { RepoFilters } from "@/types";

describe("Repository filtering and sorting functions", () => {
  describe("filterByFork", () => {
    it("should filter forks when onlyForks is true", () => {
      const result = filterByFork(mockRepos, true);
      expect(result).toEqual(mockRepos.filter((repo) => repo.fork));
    });

    it("should return all repos when onlyForks is false", () => {
      const result = filterByFork(mockRepos, false);
      expect(result).toEqual(mockRepos);
    });
  });

  describe("filterByMirror", () => {
    it("should filter mirrors when onlyMirrors is true", () => {
      const result = filterByMirror(mockRepos, true);
      expect(result).toEqual(mockRepos.filter((repo) => repo.mirrorUrl));
    });

    it("should return all repos when onlyMirrors is false", () => {
      const result = filterByMirror(mockRepos, false);
      expect(result).toEqual(mockRepos);
    });
  });

  describe("filterBySource", () => {
    it("should filter sources when onlySources is true", () => {
      const result = filterBySource(mockRepos, true);
      expect(result).toEqual(
        mockRepos.filter((repo) => !repo?.fork && !repo?.mirrorUrl)
      );
    });

    it("should return all repos when onlySources is false", () => {
      const result = filterBySource(mockRepos, false);
      expect(result).toEqual(mockRepos);
    });
  });

  describe("filterByArchived", () => {
    it("should filter archived when onlyArchived is true", () => {
      const result = filterByArchived(mockRepos, true);
      expect(result).toEqual(mockRepos.filter((repo) => repo?.archived));
    });

    it("should return all repos when onlyArchived is false", () => {
      const result = filterByArchived(mockRepos, false);
      expect(result).toEqual(mockRepos);
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

  describe("filterAndSortRepos", () => {
    it("should apply search filter", () => {
      const result = filterAndSortRepos(mockRepos, { searchParam: "repo-1" });
      expect(result).toEqual(
        mockRepos.filter((repo) => repo.name.includes("repo-1"))
      );
    });

    it("should apply fork filter", () => {
      const result = filterAndSortRepos(mockRepos, { onlyForks: true });
      expect(result).toEqual(mockRepos.filter((repo) => repo.fork));
    });

    it("should apply mirror filter", () => {
      const result = filterAndSortRepos(mockRepos, { onlyMirrors: true });
      expect(result).toEqual(mockRepos.filter((repo) => repo.mirrorUrl));
    });

    it("should apply source filter", () => {
      const result = filterAndSortRepos(mockRepos, { onlySources: true });
      expect(result).toEqual(
        mockRepos.filter((repo) => !repo?.fork && !repo?.mirrorUrl)
      );
    });

    it("should apply archived filter", () => {
      const result = filterAndSortRepos(mockRepos, { onlyArchived: true });
      expect(result).toEqual(mockRepos.filter((repo) => repo?.archived));
    });

    it("should apply combined filters", () => {
      const filters: RepoFilters = {
        searchParam: "repo",
        onlySources: true,
        onlyArchived: true,
      };
      const result = filterAndSortRepos(mockRepos, filters);
      expect(result).toEqual([mockRepos[3]]);
    });

    it("should apply sorting after filters", () => {
      const result = filterAndSortRepos(mockRepos, { sortAnchor: "stars" });
      expect(result[0].stargazers_count).toBe(200);
    });

    it("should handle conflicting filters", () => {
      const result = filterAndSortRepos(mockRepos, {
        onlyForks: true,
        onlyMirrors: true,
      });
      expect(result).toEqual([]);
    });
  });
});
