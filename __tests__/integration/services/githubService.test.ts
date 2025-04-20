import { githubService } from "@/services/githubService";

jest.setTimeout(30000);

describe("Github Service - searchRepos", () => {
  it("should fetch repositories successfully", async () => {
    const repos = await githubService.searchRepos("react");

    const repo = repos[0];

    expect(repos).toBeDefined();
    expect(Array.isArray(repos)).toBe(true);

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

describe("Github Service - getUserProfile", () => {
  it("should fetch user profile successfully", async () => {
    const username = "octocat";
    const profile = await githubService.getUserProfile(username);

    expect(profile).toBeDefined();
    expect(profile.login).toBe(username);

    expect(profile).toHaveProperty("id");
    expect(typeof profile.id).toBe("number");

    expect(profile).toHaveProperty("avatarUrl");
    expect(typeof profile.avatarUrl).toBe("string");

    expect(profile).toHaveProperty("htmlUrl");
    expect(typeof profile.htmlUrl).toBe("string");

    expect(profile).toHaveProperty("type");
    expect(typeof profile.type).toBe("string");

    expect(profile).toHaveProperty("siteAdmin");
    expect(typeof profile.siteAdmin).toBe("boolean");

    expect(profile).toHaveProperty("name");
    expect(profile.name === null || typeof profile.name === "string").toBe(
      true
    );

    expect(profile).toHaveProperty("company");
    expect(
      profile.company === null || typeof profile.company === "string"
    ).toBe(true);

    expect(profile).toHaveProperty("blog");
    expect(profile.blog === null || typeof profile.blog === "string").toBe(
      true
    );

    expect(profile).toHaveProperty("location");
    expect(
      profile.location === null || typeof profile.location === "string"
    ).toBe(true);

    expect(profile).toHaveProperty("email");
    expect(profile.email === null || typeof profile.email === "string").toBe(
      true
    );

    expect(profile).toHaveProperty("hireable");
    expect(
      profile.hireable === null || typeof profile.hireable === "boolean"
    ).toBe(true);

    expect(profile).toHaveProperty("bio");
    expect(profile.bio === null || typeof profile.bio === "string").toBe(true);

    expect(profile).toHaveProperty("twitterUsername");
    expect(
      profile.twitterUsername === null ||
        typeof profile.twitterUsername === "string"
    ).toBe(true);

    expect(profile).toHaveProperty("publicRepos");
    expect(typeof profile.publicRepos).toBe("number");

    expect(profile).toHaveProperty("publicGists");
    expect(typeof profile.publicGists).toBe("number");

    expect(profile).toHaveProperty("followers");
    expect(typeof profile.followers).toBe("number");

    expect(profile).toHaveProperty("following");
    expect(typeof profile.following).toBe("number");

    expect(profile).toHaveProperty("createdAt");
    expect(
      profile.createdAt === null || profile.createdAt instanceof Date
    ).toBe(true);

    expect(profile).toHaveProperty("updatedAt");
    expect(
      profile.updatedAt === null || profile.updatedAt instanceof Date
    ).toBe(true);
  });
});

describe("Github Service - getUserStarredRepos", () => {
  it("should fetch starred repositories successfully", async () => {
    const username = "octocat";
    const repos = await githubService.getUserStarredRepos(username);

    expect(repos).toBeDefined();
    expect(Array.isArray(repos)).toBe(true);
  });
});

describe("Github Service - getUserRepos", () => {
  it("should fetch user repositories successfully", async () => {
    const username = "octocat";
    const repos = await githubService.getUserRepos(username);

    expect(repos).toBeDefined();
    expect(Array.isArray(repos)).toBe(true);
  });
});

describe("Github Service - searchUsers", () => {
  it("should fetch users successfully", async () => {
    const users = await githubService.searchUsers("octocat");

    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });
});
