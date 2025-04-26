"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Button,
  ProfileList,
  LoadMoreButton,
  Loading,
} from "@/components";
import { useProfileSearch } from "@/hooks/useProfileSearch";
import { IProfile } from "@/types";
import { useSearchStore } from "@/store/SearchState";

export const SearchSection: React.FC = () => {
  const { searchInput, page, perPage, query, setSearchInput, submitQuery } =
    useSearchStore();
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const { data, isLoading, error, isFetching } = useProfileSearch({
    query,
    page,
    perPage,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchInput.trim().length === 0) {
      return;
    }
    if (searchInput === query) {
      return;
    }

    setProfiles([]);
    submitQuery();
    setHasSearched(false);
  };

  const handleLoadMore = () => {
    if (!isFetching) {
      useSearchStore.setState((state) => ({ page: state.page + 1 }));
    }
  };

  useEffect(() => {
    if (data) {
      setTotalCount(data.totalCount);
      setProfiles(data.items);
      if (page === 1) setHasSearched(true);
    }
  }, [data, page]);

  const fetchLoading = isLoading || isFetching;

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-2 mb-6"
      >
        <Input
          type="text"
          placeholder="Digite o nome do usuário"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="relative w-full">
          {fetchLoading && (
            <Loading className="w-full h-full text-black absolute" />
          )}
          <Button
            className="w-full px-12 md:w-fit"
            variant="gradient"
            type="submit"
            disabled={fetchLoading}
          >
            Buscar
          </Button>
        </div>
      </form>

      {isLoading && <p className="text-muted-foreground">Carregando...</p>}
      {error && <p className="text-red-500">Erro: {error.message}</p>}

      <ProfileList
        profiles={profiles}
        isLoading={isLoading}
        hasSearched={hasSearched}
      />
      <LoadMoreButton
        itemsLength={profiles.length}
        totalCount={totalCount}
        isFetching={isFetching}
        hasSearched={hasSearched}
        handleLoadMore={handleLoadMore}
      />
    </section>
  );
};
