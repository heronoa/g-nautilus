import { IPaginationReturn } from "@/types";
import { IIssue } from "@/types/issues";
import React from "react";

interface RepositoryIssuesSectionProps {
  issues: IPaginationReturn<IIssue>;
}

export const RepositoryIssuesSection: React.FC<
  RepositoryIssuesSectionProps
> = ({ issues }: RepositoryIssuesSectionProps) => {
  return (
    <section className="space-y-4 w-full max-w-3xl">
      {issues.items.map((issue: IIssue, index: number) => (
        <div key={index} className="p-4 rounded-md bg-white">
          <h6 className="font-bold text-gray-800 text-[22px]">{issue.title}</h6>
          <p className="text-gray-400 font-semibold">
            {issue.createdAt && issue.createdAt.toLocaleString()} by{" "}
            {issue.user.login}
          </p>
        </div>
      ))}
    </section>
  );
};
