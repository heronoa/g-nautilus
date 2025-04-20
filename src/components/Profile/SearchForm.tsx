"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileSearch } from "@/hooks/useProfileSearch";
import { Loading } from "../icons";
import { IProfile } from "@/types";
import ProfileCard from "./ProfileCard";

const SearchForm: React.FC = () => {
  const [search, setSearch] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { data, isLoading, error } = useProfileSearch({
    query: submittedQuery,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(search);
  };

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
          {isLoading && (
            <Loading className="w-full h-full text-black absolute " />
          )}
          <Button
            className="cursor-pointer w-full px-12 md:w-fit bg-gradient-to-r
              from-[#0056A6]
              to-[#0587FF]"
            type="submit"
            disabled={isLoading}
          >
            Buscar
          </Button>
        </div>
      </form>

      {isLoading && <p className="text-muted-foreground">Carregando...</p>}
      {error && <p className="text-red-500">Erro: {error.message}</p>}

      {data && data.length > 0 && (
        <section className="space-y-4">
          {data.map((profile: IProfile, index: number) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </section>
      )}

      {data && data.length === 0 && (
        <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
      )}
    </section>
  );
};

export default SearchForm;
