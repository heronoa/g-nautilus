interface config {
  GITHUB_API_URL: string;
  GITHUB_API_TOKEN: string;
}

export const C: config = {
  GITHUB_API_URL: "https://api.github.com",
  GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN as string,
};
