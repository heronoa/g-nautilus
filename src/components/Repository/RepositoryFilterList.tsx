"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RepositoryCard, Search } from "@/components";
import { IPaginationReturn, IRepository } from "@/types";
import { Selector } from "../ui/Selector";
import { filterAndSortRepos } from "@/utils/filterRepos";
import { Input } from "../ui/input";
import { typeOptions, languageOptions } from "@/utils/constants";

interface RepositoryFilterListProps {
  repos: IPaginationReturn<IRepository>;
  username: string;
}

export const RepositoryFilterList: React.FC<RepositoryFilterListProps> = ({
  repos,
  username,
}: RepositoryFilterListProps) => {
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
    const allIsSelected = selectedTypes.some((type) => type.value === "All");

    const filteredRepos = filterAndSortRepos(repos.items, {
      searchParam: searchParam,
      language: selectedLanguages.map((lang) => lang.value).join(","),
      onlyForks: allIsSelected
        ? false
        : selectedTypes.some((type) => type.value === "Fork"),
      onlyMirrors: allIsSelected
        ? false
        : selectedTypes.some((type) => type.value === "Mirror"),
      onlySources: allIsSelected
        ? false
        : selectedTypes.some((type) => type.value === "Source"),
      onlyArchived: allIsSelected
        ? false
        : selectedTypes.some((type) => type.value === "Archived"),
    });

    setFilteredRepos(filteredRepos);
  }, [repos.items, searchParam, selectedLanguages, selectedTypes]);

  return (
    <section>
      <div className="flex justify-between md:flex-row-reverse ">
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
        <div className="hidden md:block">
          <Input
            icon={<Search color="#989898" />}
            placeholder="Search Here"
            className="border-0 border-b-2 rounded-none border-[#F4F4F4] focus:border-gray-500 focus:ring-0"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center md:hidden cursor-pointer relative group  ">
          <Search />
          <div
            className={` 
              bg-amber-50 absolute -right-0 transition-all duration-300 ease-in-out  group-focus-within:translate-x-[-15vw]   group-focus-within:w-[80vw] group-focus-within:opacity-100 translate-x-0 opacity-0 w-[80vw] not-focus-within:w-8 not-focus:w-8
              `}
          >
            <Input
              placeholder="Search Here"
              className="border-0 border-b-2 rounded-none border-[#F4F4F4] focus:border-gray-500 not-focus-within:cursor-pointer not-focus:cursor-pointer not-focus-visible:cursor-pointer focus:ring-0"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </div>
        </div>
      </div>
      {(selectedLanguages.length > 0 || selectedTypes.length > 0) && (
        <aside className="flex items-center justify-between mt-4 text-gray-600">
          results: {filteredRepos.length} of {repos.totalCount}
        </aside>
      )}
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
