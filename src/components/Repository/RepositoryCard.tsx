import { IRepository } from "@/types";
import { BranchRegular, StarFilled } from "../icons";

interface RepositoryCardProps {
  repository: IRepository;
}

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  return (
    <div className="p-4 rounded-md space-y-4  bg-white">
      <h5 className="text-lg font-normal flex gap-1 ">
        <span className="font-light">{repository.owner.login}</span>
        <span className="">/</span>
        <span className="text-template-blue">{repository.name}</span>
      </h5>
      <p className="text-sm text-muted-foreground">{repository.description}</p>
      <div className="text-xs gap-3 flex text-zinc-500">
        <span className="flex gap-1 items-center">
          <StarFilled />
          {repository.stargazers_count}
        </span>
        <span className="flex gap-1 items-center">
          <BranchRegular /> {repository.forkCount}
        </span>
      </div>
    </div>
  );
};
