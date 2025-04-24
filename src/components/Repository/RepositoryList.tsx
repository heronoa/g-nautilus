import { RepositoryCard } from "@/components";
import Link from "next/link";
import { IRepository } from "@/types";
import { AnimatedCardWrapper } from "../Animation";


interface RepositoryListProps {
  filteredRepos: IRepository[];
  username: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  filteredRepos,
}) => {
  return (
    <div className="grid gap-4 mt-4">
      {filteredRepos.map((repo) => (
        <AnimatedCardWrapper key={repo.id} className="flex flex-col gap-4">
          <Link
            key={repo.id}
            href={`/profile/${repo.owner.login}/${repo.name}`}
            className="cursor-pointer"
          >
            <RepositoryCard repository={repo} />
          </Link>
        </AnimatedCardWrapper>
      ))}
    </div>
  );
};

export default RepositoryList;
