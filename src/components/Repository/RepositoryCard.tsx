import { IRepository } from "@/types";
import { BranchRegular, StarFilled } from "../icons";

interface RepositoryCardProps {
  repository: IRepository;
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="p-4 rounded-md  bg-white">
      <h3 className="text-lg font-medium ">
        {repository.owner.login} /{" "}
        <span className="text-[#0587ff]">{repository.name}</span>
      </h3>
      <p className="text-sm text-muted-foreground">{repository.description}</p>
      <div className="text-xs gap-3 flex text-zinc-500 mt-2">
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
}
