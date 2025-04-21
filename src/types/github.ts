export interface IOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
}

export interface ILicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
  node_id: string;
}

export interface IGithubSearchRepoDTO {
  total_count: number;
  incomplete_results: boolean;
  items: IGithubRepository[];
}

export interface IGithubSearchUserDTO {
  total_count: number;
  incomplete_results: boolean;
  items: IGithubUserProfile[];
}

export interface IGithubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: IOwner;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  visibility?: string;
  archived: boolean;
  disabled: boolean;
  license?: ILicense;
  topics?: string[];
  forks: number;
  open_issues: number;
  watchers: number;
  score: number;
  mirror_url?: string | null;
}

export interface IGithubUserProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface IGithubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: IGithubUserProfile;
  labels: string[]; // Replace `any` with a more specific type if needed
  state: string;
  locked: boolean;
  assignee: IGithubUserProfile | null;
  assignees: IGithubUserProfile[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  sub_issues_summary: {
    total: number;
    completed: number;
    percent_completed: number;
  };
  active_lock_reason: string | null;
  body: string;
  closed_by: IGithubUserProfile | null;
  reactions: {
    url: string;
    total_count: number;
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
  state_reason: string | null;
}
