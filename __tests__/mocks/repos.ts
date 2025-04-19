import { IRawRepository, IRepository } from "@/types";

export const mockRawRepos: IRawRepository[] = [
  {
    id: 1,
    name: "repo-1",
    description: "Description 1",
    language: "JavaScript",
    stargazers_count: 100,
    updated_at: "2025-04-18T00:00:00Z",
    owner: {
      login: "user1",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      html_url: "https://github.com/user1",
      id: 0,
      type: "",
      site_admin: false,
    },
  },
  {
    id: 2,
    name: "repo-2",
    description: "Description 2",
    language: "TypeScript",
    stargazers_count: 200,
    updated_at: "2025-04-17T00:00:00Z",
    owner: {
      login: "user2",
      avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
      html_url: "https://github.com/user2",
      id: 0,
      type: "",
      site_admin: false,
    },
  },
];

export const mockRepos: IRepository[] = [
  {
    id: 1,
    name: "repo-1",
    description: "Description 1",
    language: "JavaScript",
    stargazers_count: 100,
    updated_at: new Date("2025-04-18T00:00:00Z"),
    owner: {
      login: "user1",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      html_url: "https://github.com/user1",
    },
  },
  {
    id: 2,
    name: "repo-2",
    description: "Description 2",
    language: "TypeScript",
    stargazers_count: 200,
    updated_at: new Date("2025-04-17T00:00:00Z"),
    owner: {
      login: "user2",
      avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
      html_url: "https://github.com/user1",
    },
  },
];
