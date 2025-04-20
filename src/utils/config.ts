interface config {
  githubApiUrl: string;
  githubApiToken: string;
}

export const C: config = {
  githubApiUrl: "https://api.github.com",
  githubApiToken: process.env.GITHUB_API_TOKEN as string,
};
