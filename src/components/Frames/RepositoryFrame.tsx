import { IPaginationReturn, IRepository } from "@/types";
import { IIssue } from "@/types/issues";
import {
  HomeHeadingSection,
  RepositoryDetailsSection,
  RepositoryStatsSection,
} from "@/components";

interface RepositoryFrameProps {
  repository: IRepository;
  issues: IPaginationReturn<IIssue>;
}
export const RepositoryFrame: React.FC<RepositoryFrameProps> = ({
  repository,
  issues,
}: RepositoryFrameProps) => {
  return (
    <main className="flex flex-col justify-center items-center mx-auto px-4 py-8 max-w-3xl  p-4 relative">
      <HomeHeadingSection headTitle={false} back />
      <RepositoryDetailsSection repository={repository} />
      <RepositoryStatsSection
        forkCount={repository?.forkCount || 0}
        starCount={repository.stargazers_count}
        issueTotalCount={issues.totalCount}
      />

      <section className="space-y-4 w-full max-w-3xl">
        {issues.items.map((issue: IIssue, index: number) => (
          <div key={index} className="p-4 rounded-md bg-white">
            <div className="font-bold text-gray-800">{issue.title}</div>
            <div className="text-gray-400 font-semibold">
              {issue.createdAt && issue.createdAt.toLocaleString()} by{" "}
              {issue.user.login}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
