import { githubService } from "@/services/githubService";

jest.setTimeout(30000);

describe("Github Service - searchRepos", () => {
  it("should fetch repositories successfully", async () => {
    const repos = await githubService.searchRepos("react");

    const repo = repos.items[0];

    expect(repos).toBeDefined();
    expect(Array.isArray(repos.items)).toBe(true);

    expect(repo).toHaveProperty("id");
    expect(typeof repo.id).toBe("number");

    expect(repo).toHaveProperty("name");
    expect(typeof repo.name).toBe("string");

    expect(repo).toHaveProperty("description");
    expect(
      repo.description === null || typeof repo.description === "string"
    ).toBe(true);

    expect(repo).toHaveProperty("language");
    expect(repo.language === null || typeof repo.language === "string").toBe(
      true
    );

    expect(repo).toHaveProperty("stargazers_count");
    expect(typeof repo.stargazers_count).toBe("number");

    expect(repo).toHaveProperty("updatedAt");
    expect(repo.updatedAt === null || repo.updatedAt instanceof Date).toBe(
      true
    );

    expect(repo).toHaveProperty("owner");
    expect(repo.owner).toHaveProperty("login");
    expect(typeof repo.owner.login).toBe("string");

    expect(repo.owner).toHaveProperty("avatarUrl");
    expect(typeof repo.owner.avatarUrl).toBe("string");

    expect(repo.owner).toHaveProperty("htmlUrl");
    expect(
      repo.owner.htmlUrl === undefined || typeof repo.owner.htmlUrl === "string"
    ).toBe(true);

    expect(repo).toHaveProperty("watchersCount");
    expect(typeof repo.watchersCount).toBe("number");

    expect(repo).toHaveProperty("fork");
    expect(typeof repo.fork).toBe("boolean");

    expect(repo).toHaveProperty("archived");
    expect(typeof repo.archived).toBe("boolean");

    if (repo.pushedAt) {
      expect(repo.pushedAt instanceof Date).toBe(true);
    }

    if (repo.createdAt) {
      expect(repo.createdAt instanceof Date).toBe(true);
    }
  });
});

describe("Github Service - searchUsers", () => {
  it("should fetch users successfully", async () => {
    const users = await githubService.searchUsers("octocat");

    expect(users).toBeDefined();
    expect(Array.isArray(users.items)).toBe(true);
    expect(Number.isInteger(users.totalCount)).toBe(true);
  });
});
