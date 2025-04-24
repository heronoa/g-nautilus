"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileSearch } from "@/hooks/useProfileSearch";
import { Loading } from "../icons";
import { IProfile } from "@/types";
import ProfileCard from "../Profile/ProfileCard";
import { useSearchStore } from "@/store/SearchState";
import { AnimatedCardWrapper } from "../Animation";

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
    setProfiles([]);
    submitQuery();
    setHasSearched(false);
  };

  const handleLoadMore = () => {
    if (!isFetching) {
      useSearchStore.setState((state) => ({
        page: state.page + 1,
      }));
    }
  };

  useEffect(() => {
    if (data) {
      setTotalCount(data.totalCount);
      setProfiles((prev) =>
        page === 1 ? data.items : [...prev, ...data.items]
      );
      if (page === 1) {
        setHasSearched(true);
      }
    }
  }, [data, page]);

  const showLoadMoreButton =
    hasSearched && !isLoading && !isFetching && profiles.length < totalCount;

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

      {!isLoading && profiles.length > 0 && (
        <section className="space-y-4">
          {profiles.map((profile: IProfile) => (
            <AnimatedCardWrapper
              key={profile.id}
              className="flex flex-col gap-4"
            >
              <ProfileCard profile={profile} />
            </AnimatedCardWrapper>
          ))}
        </section>
      )}

      {!isLoading && hasSearched && profiles.length === 0 && (
        <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
      )}

      {showLoadMoreButton && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleLoadMore}
            disabled={isFetching}
            variant="gradient"
            className="cursor-pointer w-full px-12 md:w-fit"
          >
            {isFetching ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      )}
    </section>
  );
};
