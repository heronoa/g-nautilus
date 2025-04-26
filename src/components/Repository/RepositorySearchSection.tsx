"use client";

import React, { useEffect, useState } from "react";
import RepositoryList from "./RepositoryList";
import { IPaginationReturn, IRepository } from "@/types";
import { RepositoryFilters } from "./RepositoryFilters";
import { useFilterRepoState } from "@/store/FilterRepoState";
import { LoadMoreButton } from "../ui";
import { useRepos } from "@/hooks/useRepos";
import { MAX_PAGE_FETCH_ALL } from "@/utils";

interface RepositoryFilterContainerProps {
  repos: IPaginationReturn<IRepository>;
  username: string;
  starred: boolean;
  totalCount: number;
}

export const RepositorySearchSection: React.FC<
  RepositoryFilterContainerProps
> = ({ repos, username, starred, totalCount }) => {
  const { filteredRepos, setFilteredRepos } = useFilterRepoState();
  const [initialRepos, setInitialRepos] = useState<IRepository[]>(repos.items);
  const [currentPage, setCurrentPage] = useState<number>(
    MAX_PAGE_FETCH_ALL + 1
  );

  const { data, isFetching } = useRepos({
    type: starred ? "starred" : "owner",
    page: currentPage,
    perPage: 30,
    username,
  });

  function handleLoadMore() {
    if (!isFetching) {
      if (data) {
        setFilteredRepos([...filteredRepos, ...data]);
      }
      setCurrentPage((prev) => prev + 1); // 🔥 Incrementa a página depois de carregar
    }
  }

  useEffect(() => {
    if (filteredRepos.length > 0) {
      setInitialRepos(filteredRepos);
    }
  }, [filteredRepos]);

  return (
    <section>
      <RepositoryFilters repos={repos} />
      <RepositoryList filteredRepos={initialRepos} username={username} />
      <LoadMoreButton
        itemsLength={initialRepos.length}
        totalCount={totalCount}
        isFetching={isFetching}
        handleLoadMore={handleLoadMore}
      />
    </section>
  );
};
