"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RepositoryCard } from "@/components";
import { IPaginationReturn, IRepository } from "@/types";
import { Selector } from "../ui/Selector";
import { filterAndSortRepos } from "@/utils/filterRepos";
import { Input } from "../ui/input";

interface RepositoryFilterListProps {
  repos: IPaginationReturn<IRepository>;
  username: string;
}

const RepositoryFilterList: React.FC<RepositoryFilterListProps> = ({
  repos,
  username,
}: RepositoryFilterListProps) => {
  const languageOptions: {
    value: string;
    label: string;
  }[] = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
  ];

  const typeOptions: {
    value: string;
    label: string;
  }[] = [
    { value: "Fork", label: "Fork" },
    { value: "Mirror", label: "Mirror" },
    { value: "Source", label: "Source" },
    { value: "Archived", label: "Archived" },
    { value: "All", label: "All" },
  ];

  const [selectedLanguages, setSelectedLanguages] = React.useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [selectedTypes, setSelectedTypes] = React.useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [searchParam, setSearchParam] = React.useState<string>("");

  const [filteredRepos, setFilteredRepos] = React.useState<IRepository[]>(
    repos.items
  );

  useEffect(() => {
    const filteredRepos = filterAndSortRepos(repos.items, {
      language: selectedLanguages.map((lang) => lang.value).join(","),
      searchParam: searchParam,
      onlyForks: selectedTypes.some((type) => type.value === "Fork"),
      onlyMirrors: selectedTypes.some((type) => type.value === "Mirror"),
      onlySources: selectedTypes.some((type) => type.value === "Source"),
      onlyArchived: selectedTypes.some((type) => type.value === "Archived"),
    });

    if (selectedTypes.some((type) => type.value === "All")) {
      setFilteredRepos(repos.items);
    } else if (selectedTypes.length === 0) {
      setFilteredRepos(repos.items);
    } else {
      setFilteredRepos(filteredRepos);
    }
  }, [repos.items, searchParam, selectedLanguages, selectedTypes]);

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Selector
            placeholder="Type"
            options={typeOptions}
            onChange={setSelectedTypes}
          />
          <Selector
            placeholder="Language"
            options={languageOptions}
            onChange={setSelectedLanguages}
          />
        </div>
        <div>
          <Input
            placeholder="Search repositories..."
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>
        <div></div>
      </div>
      <div className="grid gap-4 mt-4 ">
        {filteredRepos.map((repo: IRepository) => (
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
