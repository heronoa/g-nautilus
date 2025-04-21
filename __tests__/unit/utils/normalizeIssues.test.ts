import { IIssue } from "@/types/issues";
import { normalizeIssue } from "../../../src/utils/normalizeIssues";
import { mockRawIssues } from "@/tests/mocks";

describe("normalizeIssue function", () => {
  it("should normalize raw GitHub issue data to match the IIssue interface", () => {
    const result = normalizeIssue(mockRawIssues);

    expect(result).toHaveLength(mockRawIssues.length);

    result.forEach((issue: IIssue) => {
      expect(issue).toHaveProperty("id");
      expect(issue).toHaveProperty("title");
      expect(issue).toHaveProperty("user");
      expect(issue.user).toHaveProperty("login");
      expect(issue.user).toHaveProperty("htmlUrl");
      expect(issue).toHaveProperty("htmlUrl");
      expect(issue).toHaveProperty("state");
      expect(issue).toHaveProperty("url");
      expect(issue).toHaveProperty("reactions");
      expect(issue.reactions).toHaveProperty("url");
      expect(issue.reactions).toHaveProperty("totalCount");
      expect(issue.reactions).toHaveProperty("+1");
      expect(issue.reactions).toHaveProperty("-1");
      expect(issue.reactions).toHaveProperty("laugh");
      expect(issue.reactions).toHaveProperty("hooray");
      expect(issue.reactions).toHaveProperty("confused");
      expect(issue.reactions).toHaveProperty("heart");
      expect(issue.reactions).toHaveProperty("rocket");
      expect(issue.reactions).toHaveProperty("eyes");
      expect(issue).toHaveProperty("updatedAt");
      expect(issue).toHaveProperty("createdAt");
    });
  });

  it("should handle null or missing values correctly", () => {
    const result = normalizeIssue([
      ...mockRawIssues,
      {
        id: 999,
        title: null,
        user: {
          id: null,
          node_id: null,
          login: null,
          avatar_url: null,
          gravatar_id: null,
          url: null,
          followers_url: null,
          following_url: null,
          gists_url: null,
          starred_url: null,
          subscriptions_url: null,
          organizations_url: null,
          repos_url: null,
          events_url: null,
          received_events_url: null,
          type: null,
          user_view_type: null,
          site_admin: null,
          name: null,
          company: null,
          blog: null,
          location: null,
          email: null,
          hireable: null,
          bio: null,
          twitter_username: null,
          public_repos: null,
          public_gists: null,
          followers: null,
          following: null,
          created_at: null,
          updated_at: null,
          html_url: null,
        },

        html_url: null,
        state: null,
        url: null,
        reactions: {
          url: null,
          total_count: null,
          "+1": null,
          "-1": null,
          laugh: null,
          hooray: null,
          confused: null,
          heart: null,
          rocket: null,
          eyes: null,
        },
        updated_at: null,
        created_at: null,
      },
    ]);

    expect(result).toHaveLength(mockRawIssues.length + 1);
    expect(result[result.length - 1].title).toBe("No Name");
    expect(result[result.length - 1].user.login).toBe("Unknown");
    expect(result[result.length - 1].user.htmlUrl).toBeUndefined();
    expect(result[result.length - 1].htmlUrl).toBeUndefined();
    expect(result[result.length - 1].state).toBe("unknown");
    expect(result[result.length - 1].url).toBeUndefined();
    expect(result[result.length - 1].reactions.url).toBeUndefined();
    expect(result[result.length - 1].reactions.totalCount).toEqual(0);
    expect(result[result.length - 1].reactions["+1"]).toEqual(0);
    expect(result[result.length - 1].reactions["-1"]).toEqual(0);
    expect(result[result.length - 1].reactions.laugh).toEqual(0);
    expect(result[result.length - 1].reactions.hooray).toEqual(0);
    expect(result[result.length - 1].reactions.confused).toEqual(0);
    expect(result[result.length - 1].reactions.heart).toEqual(0);
    expect(result[result.length - 1].reactions.rocket).toEqual(0);
    expect(result[result.length - 1].reactions.eyes).toEqual(0);
    expect(result[result.length - 1].updatedAt).toBeNull();
    expect(result[result.length - 1].createdAt).toBeNull();
  });
});
