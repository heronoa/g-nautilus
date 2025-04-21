import { IIssue, IRawIssue } from "@/types/issues";
import { parseDate, isValidUrl } from "./helpers";

export const normalizeIssue = (rawData: IRawIssue[]): IIssue[] => {
  return rawData.map((issue) => ({
    id: issue?.id,
    title: issue?.title || "No Name",
    user: {
      login: issue?.user?.login || "Unknown",
      htmlUrl:
        typeof issue?.user?.html_url === "string" &&
        isValidUrl(issue.user.html_url)
          ? issue.user.html_url
          : undefined,
    },
    htmlUrl:
      typeof issue?.html_url === "string" && isValidUrl(issue.html_url)
        ? issue.html_url
        : undefined,
    state: issue?.state || "unknown",
    url:
      typeof issue?.url === "string" && isValidUrl(issue?.url)
        ? issue?.url
        : undefined,
    reactions: {
      url:
        typeof issue?.reactions?.url === "string" &&
        isValidUrl(issue?.reactions?.url)
          ? issue?.reactions?.url
          : undefined,
      totalCount: issue?.reactions?.total_count || 0,
      "+1": issue?.reactions?.["+1"] || 0,
      "-1": issue?.reactions?.["-1"] || 0,
      laugh: issue?.reactions?.laugh || 0,
      hooray: issue?.reactions?.hooray || 0,
      confused: issue?.reactions?.confused || 0,
      heart: issue?.reactions?.heart || 0,
      rocket: issue?.reactions?.rocket || 0,
      eyes: issue?.reactions?.eyes || 0,
    },
    updatedAt: parseDate(issue?.updated_at),
    createdAt: parseDate(issue?.created_at),
  }));
};
