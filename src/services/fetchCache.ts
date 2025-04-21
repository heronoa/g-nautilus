import { C } from "@/utils";

async function fetchWithCache(url: string): Promise<Response> {
  try {
    const response = await fetch(`${C.githubApiUrl}${url}`, {
      cache: "force-cache",
      next: { revalidate: 60 },
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${C.githubApiToken}`,
        "User-Agent": "g-nautilus",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export default fetchWithCache;
