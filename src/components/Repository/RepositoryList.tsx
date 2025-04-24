import { RepositoryCard } from "@/components";
import Link from "next/link";
import { IRepository } from "@/types";

interface RepositoryListProps {
  filteredRepos: IRepository[];
  username: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  filteredRepos,
  username,
}) => {
  return (
    <div className="grid gap-4 mt-4">
      {filteredRepos.map((repo) => (
        <Link
          key={repo.id}
          href={`/profile/${username}/${repo.name}`}
          className="cursor-pointer"
        >
          <RepositoryCard repository={repo} />
        </Link>
      ))}
    </div>
  );
};

export default RepositoryList;
