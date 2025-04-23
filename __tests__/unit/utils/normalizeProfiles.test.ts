import { normalizeProfiles } from "@/utils";
import { IGithubUserProfile, IProfile } from "@/types";

describe("normalizeGithubUserProfile function", () => {
  const mockRawProfiles: IGithubUserProfile[] = [
    {
      login: "testuser",
      id: 12345,
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/testuser",
      followers_url: "https://api.github.com/users/testuser/followers",
      following_url:
        "https://api.github.com/users/testuser/following{/other_user}",
      gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/testuser/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
      organizations_url: "https://api.github.com/users/testuser/orgs",
      repos_url: "https://api.github.com/users/testuser/repos",
      events_url: "https://api.github.com/users/testuser/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/testuser/received_events",
      type: "User",
      site_admin: false,
      name: "Test User",
      company: "Test Company",
      blog: "https://testuser.blog",
      location: "Test Location",
      email: "testuser@example.com",
      hireable: true,
      bio: "This is a test user.",
      twitter_username: "testuser",
      public_repos: 10,
      public_gists: 5,
      followers: 100,
      following: 50,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      node_id: "",
      gravatar_id: "",
      url: "",
      user_view_type: "",
    },
  ];

  it("should normalize raw GitHub profile data to match the IProfile interface", () => {
    const normalizedProfiles = normalizeProfiles(mockRawProfiles);

    const mockRawProfile = mockRawProfiles[0];
    const result = normalizedProfiles[0];

    expect(result).toHaveProperty("login", mockRawProfile.login);
    expect(result).toHaveProperty("id", mockRawProfile.id);
    expect(result).toHaveProperty("avatarUrl", mockRawProfile.avatar_url);
    expect(result).toHaveProperty("htmlUrl", mockRawProfile.html_url);
    expect(result).toHaveProperty("followersUrl", mockRawProfile.followers_url);
    expect(result).toHaveProperty("followingUrl", mockRawProfile.following_url);
    expect(result).toHaveProperty("gistsUrl", mockRawProfile.gists_url);
    expect(result).toHaveProperty("starredUrl", mockRawProfile.starred_url);
    expect(result).toHaveProperty(
      "subscriptionsUrl",
      mockRawProfile.subscriptions_url
    );
    expect(result).toHaveProperty(
      "organizationsUrl",
      mockRawProfile.organizations_url
    );
    expect(result).toHaveProperty("reposUrl", mockRawProfile.repos_url);
    expect(result).toHaveProperty("eventsUrl", mockRawProfile.events_url);
    expect(result).toHaveProperty(
      "receivedEventsUrl",
      mockRawProfile.received_events_url
    );
    expect(result).toHaveProperty("type", mockRawProfile.type);
    expect(result).toHaveProperty("siteAdmin", mockRawProfile.site_admin);
    expect(result).toHaveProperty("name", mockRawProfile.name);
    expect(result).toHaveProperty("company", mockRawProfile.company);
    expect(result).toHaveProperty("blog", mockRawProfile.blog);
    expect(result).toHaveProperty("location", mockRawProfile.location);
    expect(result).toHaveProperty("email", mockRawProfile.email);
    expect(result).toHaveProperty("hireable", mockRawProfile.hireable);
    expect(result).toHaveProperty("bio", mockRawProfile.bio);
    expect(result).toHaveProperty(
      "twitterUsername",
      mockRawProfile.twitter_username
    );
    expect(result).toHaveProperty("publicRepos", mockRawProfile.public_repos);
    expect(result).toHaveProperty("publicGists", mockRawProfile.public_gists);
    expect(result).toHaveProperty("followers", mockRawProfile.followers);
    expect(result).toHaveProperty("following", mockRawProfile.following);
    expect(result).toHaveProperty(
      "createdAt",
      new Date(mockRawProfile.created_at)
    );
    expect(result).toHaveProperty(
      "updatedAt",
      new Date(mockRawProfile.updated_at)
    );
  });

  it("should handle null or missing values correctly", () => {
    const mockRawProfilesWithNulls: IGithubUserProfile[] = [
      {
        login: "",
        id: 12345,
        avatar_url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "User",
        site_admin: false,
        name: null,
        company: null,
        blog: null,
        location: null,
        email: null,
        hireable: null,
        bio: null,
        twitter_username: null,
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        created_at: "",
        updated_at: "",
        node_id: "",
        gravatar_id: "",
        url: "",
        user_view_type: "",
      },
    ];

    const normalizedProfiles: IProfile[] = normalizeProfiles(
      mockRawProfilesWithNulls
    );
    const result = normalizedProfiles[0];

    expect(result.login).toBe("");
    expect(result.avatarUrl).toBe("");
    expect(result.htmlUrl).toBe("");
    expect(result.followersUrl).toBe("");
    expect(result.followingUrl).toBe("");
    expect(result.gistsUrl).toBe("");
    expect(result.starredUrl).toBe("");
    expect(result.subscriptionsUrl).toBe("");
    expect(result.organizationsUrl).toBe("");
    expect(result.reposUrl).toBe("");
    expect(result.eventsUrl).toBe("");
    expect(result.receivedEventsUrl).toBe("");
    expect(result.name).toBe("");
    expect(result.company).toBe("");
    expect(result.blog).toBe("");
    expect(result.location).toBe("");
    expect(result.email).toBe("");
    expect(result.hireable).toBe(false);
    expect(result.bio).toBe("");
    expect(result.twitterUsername).toBe("");
    expect(result.createdAt).toBeNull();
    expect(result.updatedAt).toBeNull();
  });
});
