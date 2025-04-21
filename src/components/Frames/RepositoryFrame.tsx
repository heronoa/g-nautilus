import { IPaginationReturn, IRepository } from "@/types";
import Image from "next/image";
import { IIssue } from "@/types/issues";
import {
  Bookmark,
  BranchRegular,
  IconsStar,
  HomeHeadingSection,
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
    <div className="flex flex-col justify-center items-center mx-auto px-4 py-8">
      <HomeHeadingSection back />
      <section className="flex flex-col md:flex-row items-center md:items-start mb-8 w-full max-w-3xl">
        <Image
          width={128}
          height={128}
          src={repository.owner.avatarUrl}
          alt={`Avatar de ${repository.name}`}
          className="w-32 h-32 rounded-full md:mr-6 mb-4 md:mb-0"
        />
        <div className="flex flex-col justify-center items-start">
          <h1 className=" w-full text-center md:text-left font-bold text-4xl">
            {repository.owner.login}/{repository.name}
          </h1>
          <p className="text-gray-600">{repository.description}</p>
        </div>
      </section>
      <aside className="flex flex-row items-center justify-around md:justify-start w-full max-w-3xl mb-8">
        {[
          {
            name: "Forks",
            qty: repository.forkCount,
            icon: <BranchRegular className="!text-gray-500" />,
          },
          {
            name: "Stars",
            qty: repository.stargazers_count,
            icon: <IconsStar className="!text-gray-500" />,
          },
          {
            name: "Issues",
            qty: issues.totalCount,
            icon: <Bookmark className="!text-gray-500" />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center  text-center p-4 rounded-md "
          >
            <div className="text text-3xl">{item.qty}</div>
            <div className="text-gray-500 flex justify-center items-center gap-2 mb-2">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </aside>

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
    </div>
  );
};
