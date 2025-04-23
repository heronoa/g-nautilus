import { C } from "@/utils";

interface IFetchResponse {
  status: number;
  statusText: string;
  headers: Headers;
  url: string;
  data: unknown;
}

async function fetchWithCache<T = unknown>(
  url: string
): Promise<Omit<IFetchResponse, "data"> & { data: T }> {
  try {
    const response = await fetch(`${C.githubApiUrl}${url}`, {
      cache: "force-cache",
      next: { revalidate: 60 },
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        ...(C.githubApiToken && {
          Authorization: `Bearer ${C.githubApiToken}`,
        }),
        "User-Agent": "g-nautilus",
      },
    });

    const json = await response.json();

    const result = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      url: response.url,
      data: json,
    };
    return result;
  } catch (error) {
    throw error;
  }
}

export default fetchWithCache;
