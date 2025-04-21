"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileSearch } from "@/hooks/useProfileSearch";
import { Loading } from "../icons";
import { IProfile } from "@/types";
import ProfileCard from "./ProfileCard";

const SearchForm: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const { data, isLoading, error, isFetching } = useProfileSearch({
    query: submittedQuery,
    page,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfiles([]);
    setPage(1);
    setSubmittedQuery(search);
    setHasSearched(false);
  };

  const handleLoadMore = () => {
    if (!isFetching) {
      setPage((prev) => prev + 1);
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="relative w-full">
          {fetchLoading && (
            <Loading className="w-full h-full text-black absolute" />
          )}
          <Button
            className="cursor-pointer w-full px-12 md:w-fit bg-gradient-to-r from-[#0056A6] to-[#0587FF]"
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
          {profiles.map((profile: IProfile, index: number) => (
            <ProfileCard key={index} profile={profile} />
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
            className="cursor-pointer w-full px-12 md:w-fit bg-gradient-to-r from-[#0056A6] to-[#0587FF]"
          >
            {isFetching ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default SearchForm;
