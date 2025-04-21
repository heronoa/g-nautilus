import React from "react";
import Link from "next/link";
import { RepositoryCard } from "@/components";
import { IPaginationReturn, IRepository } from "@/types";
import { Selector } from "../ui/Selector";

interface RepositoryFilterListProps {
  repos: IPaginationReturn<IRepository>;
  username: string;
}

const RepositoryFilterList: React.FC<RepositoryFilterListProps> = ({
  repos,
  username,
}: RepositoryFilterListProps) => {
  return (
    <section>
      <div className="flex justify-between">
        <div>
          <Selector />
        </div>
        <div></div>
      </div>
      <div className="grid gap-4 mt-4 ">
        {repos.items.map((repo: IRepository) => (
          <Link
            key={repo.id}
            href={`/profile/${username}/${repo.name}`}
            className="cursor-pointer "
          >
            <RepositoryCard repository={repo} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RepositoryFilterList;
