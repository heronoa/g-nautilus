import { IGithubUserProfile, IProfile } from "@/types";
import { isValidUrl, parseDate } from "./helpers";

export const normalizeProfiles = (
  rawProfile: IGithubUserProfile[]
): IProfile[] => {
  return rawProfile.map((profile) => ({
    login: profile.login || "",
    id: profile.id,
    avatarUrl: isValidUrl(profile.avatar_url) ? profile.avatar_url : "",
    htmlUrl: isValidUrl(profile.html_url) ? profile.html_url : "",
    followersUrl: isValidUrl(profile.followers_url)
      ? profile.followers_url
      : "",
    followingUrl: isValidUrl(profile.following_url)
      ? profile.following_url
      : "",
    gistsUrl: isValidUrl(profile.gists_url) ? profile.gists_url : "",
    starredUrl: isValidUrl(profile.starred_url) ? profile.starred_url : "",
    subscriptionsUrl: isValidUrl(profile.subscriptions_url)
      ? profile.subscriptions_url
      : "",
    organizationsUrl: isValidUrl(profile.organizations_url)
      ? profile.organizations_url
      : "",
    reposUrl: isValidUrl(profile.repos_url) ? profile.repos_url : "",
    eventsUrl: isValidUrl(profile.events_url) ? profile.events_url : "",
    receivedEventsUrl: isValidUrl(profile.received_events_url)
      ? profile.received_events_url
      : "",
    type: profile.type,
    siteAdmin: profile.site_admin,
    name: profile.name || "",
    company: profile.company || "",
    blog: profile.blog || "",
    location: profile.location || "",
    email: profile.email || "",
    hireable: profile.hireable ?? false,
    bio: profile.bio || "",
    twitterUsername: profile.twitter_username || "",
    publicRepos: profile.public_repos,
    publicGists: profile.public_gists,
    followers: profile.followers,
    following: profile.following,
    createdAt: parseDate(profile.created_at),
    updatedAt: parseDate(profile.updated_at),
  }));
};
