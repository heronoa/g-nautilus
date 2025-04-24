"use client";

import React from "react";
import { Search } from "@/components";
import { IPaginationReturn, IRepository } from "@/types";
import { Selector } from "../ui/Selector";
import { Input } from "../ui/input";
import { typeOptions, languageOptions } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useFilter } from "@/hooks/useRepoFilters";
import { useFilterRepoState } from "@/store/FilterRepoState";

interface RepositoryFiltersProps {
  repos: IPaginationReturn<IRepository>;
}

export const RepositoryFilters: React.FC<RepositoryFiltersProps> = ({
  repos,
}: RepositoryFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filteredRepos } = useFilterRepoState();

  const {
    searchValue,
    setSearchValue,
    updateSearchParams,
    selectedLanguages,
    selectedTypes,
  } = useFilter(repos, router, pathname, searchParams);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    updateSearchParams({ param: "searchParam", value });
  };

  return (
    <aside>
      <div className="flex justify-between md:flex-row-reverse">
        <div className="flex gap-4">
          <Selector
            placeholder="Type"
            options={typeOptions}
            onChange={(value: string) =>
              updateSearchParams({ param: "types", value })
            }
          />
          <Selector
            placeholder="Language"
            options={languageOptions}
            onChange={(value: string) =>
              updateSearchParams({ param: "languages", value })
            }
          />
        </div>
        <div className="hidden md:block">
          <Input
            icon={<Search color="#989898" />}
            placeholder="Search Here"
            className="border-0 border-b-2 rounded-none border-[#F4F4F4] focus:border-gray-500 focus:ring-0"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex justify-center items-center md:hidden cursor-pointer relative group">
          <Search />
          <div
            className={` 
              bg-amber-50 absolute -right-0 transition-all duration-300 ease-in-out group-focus-within:translate-x-[-15vw] group-focus-within:w-[80vw] group-focus-within:opacity-100 translate-x-0 opacity-0 w-[80vw] not-focus-within:w-8 not-focus:w-8
            `}
          >
            <Input
              placeholder="Search Here"
              className="border-0 border-b-2 rounded-none border-[#F4F4F4] focus:border-gray-500 not-focus-within:cursor-pointer not-focus:cursor-pointer not-focus-visible:cursor-pointer focus:ring-0"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      {(selectedLanguages.length > 0 || selectedTypes.length > 0) && (
        <aside className="flex items-center justify-between mt-4 text-gray-600">
          results: {filteredRepos.length} of {repos.totalCount}
        </aside>
      )}
    </aside>
  );
};
