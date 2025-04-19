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
      expect(repo).toHaveProperty("updated_at");
      expect(repo).toHaveProperty("owner");
      expect(repo.owner).toHaveProperty("login");
      expect(repo.owner).toHaveProperty("avatar_url");
      expect(repo.owner).toHaveProperty("html_url");
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
    expect(result[result.length - 1].updated_at).toBeNull();
    expect(result[result.length - 1].owner.login).toBe("Unknown");
    expect(result[result.length - 1].owner.avatar_url).toBe("");
    expect(result[result.length - 1].owner.html_url).toBe("");
  });
});
