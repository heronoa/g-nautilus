import { IRepository } from "@/types";
import { normalizeRepos } from "../../../src/utils/normalizeRepos";
import { mockRawRepos } from "@/tests/mocks";

describe("normalizeRepos function", () => {
  it("should normalize raw GitHub data to match the IRepository interface", () => {
    const result = normalizeRepos(mockRawRepos);

    expect(result).toHaveLength(mockRawRepos.length);

    result.forEach((repo: IRepository) => {
      expect(repo).toHaveProperty("id");
      expect(repo).toHaveProperty("name");
      expect(repo).toHaveProperty("description");
      expect(repo).toHaveProperty("language");
      expect(repo).toHaveProperty("stargazers_count");
      expect(repo).toHaveProperty("updatedAt");
      expect(repo).toHaveProperty("owner");
      expect(repo.owner).toHaveProperty("login");
      expect(repo.owner).toHaveProperty("avatarUrl");
      expect(repo.owner).toHaveProperty("htmlUrl");
      expect(repo).toHaveProperty("watchersCount");
      expect(repo).toHaveProperty("fork");
      expect(repo).toHaveProperty("archived");
      expect(repo).toHaveProperty("pushedAt");
      expect(repo).toHaveProperty("createdAt");
      expect(repo).toHaveProperty("mirrorUrl");
      expect(repo).toHaveProperty("forkCount");
      expect(repo).toHaveProperty("htmlUrl");
    });
  });

  it("should handle null or missing values correctly", () => {
    const result = normalizeRepos([
      ...mockRawRepos,
      {
        id: 999,
        name: "repo-null",
        description: null,
        language: null,
        stargazers_count: null,
        updated_at: null,
        owner: {
          login: null,
          avatar_url: null,
          html_url: null,
          id: null,
          type: null,
          site_admin: null,
        },
      },
    ]);

    expect(result).toHaveLength(mockRawRepos.length + 1);
    expect(result[result.length - 1].description).toBeNull();
    expect(result[result.length - 1].language).toBe("Unknown");
    expect(result[result.length - 1].stargazers_count).toEqual(0);
    expect(result[result.length - 1].updatedAt).toBeNull();
    expect(result[result.length - 1].owner.login).toBe("Unknown");
    expect(result[result.length - 1].owner.avatarUrl).toBe("");
    expect(result[result.length - 1].owner.htmlUrl).toBe("");
    expect(result[result.length - 1].watchersCount).toEqual(0);
    expect(result[result.length - 1].fork).toBe(false);
    expect(result[result.length - 1].archived).toBe(false);
    expect(result[result.length - 1].pushedAt).toBeNull();
    expect(result[result.length - 1].createdAt).toBeNull();
    expect(result[result.length - 1].mirrorUrl).toBeUndefined();
  });
});
