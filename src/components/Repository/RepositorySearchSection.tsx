"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { useFilter } from "@/hooks/useRepoFilters";
import RepositoryList from "./RepositoryList";
import { IPaginationReturn, IRepository } from "@/types";
import { RepositoryFilters } from "./RepositoryFilters";
import { useFilterRepoState } from "@/store/FilterRepoState";

interface RepositoryFilterContainerProps {
  repos: IPaginationReturn<IRepository>;
  username: string;
}

export const RepositorySearchSection: React.FC<
  RepositoryFilterContainerProps
> = ({ repos, username }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filteredRepos } = useFilterRepoState();

  const { selectedLanguages, selectedTypes } = useFilter(
    repos,
    router,
    pathname,
    searchParams
  );

  function reposFallback() {
    if (
      repos.totalCount > 0 &&
      filteredRepos.length === 0 &&
      selectedLanguages.length === 0 &&
      selectedTypes.length === 0
    ) {
      return repos.items;
    }
    return filteredRepos;
  }

  return (
    <section>
      <RepositoryFilters repos={repos} />

      <RepositoryList filteredRepos={reposFallback()} username={username} />
    </section>
  );
};
