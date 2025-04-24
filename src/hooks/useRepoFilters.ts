import { useState, useMemo, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { filterAndSortRepos } from "@/utils/filterRepos";
import { IPaginationReturn, IRepository } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useFilterRepoState } from "@/store/FilterRepoState";

interface IUpdateSearchParams {
  param: string;
  value: string;
}

interface IUseFilterReturn {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  updateSearchParams: ({ param, value }: IUpdateSearchParams) => void;
  selectedLanguages: { value: string; label: string }[];
  selectedTypes: { value: string; label: string }[];
}

export const useFilter = (
  repos: IPaginationReturn<IRepository>,
  router: AppRouterInstance,
  pathname: string,
  searchParams: URLSearchParams
): IUseFilterReturn => {
  const searchParam: string = searchParams?.get("searchParam") || "";
  const [searchValue, setSearchValue] = useState<string>(searchParam);

  const selectedLanguages = useMemo<{ value: string; label: string }[]>(() => {
    const langs = searchParams?.get("languages")?.split(",") || [];
    return langs
      .filter((lang) => lang.trim() !== "")
      .map((lang) => ({ value: lang, label: lang }));
  }, [searchParams]);

  const selectedTypes = useMemo<{ value: string; label: string }[]>(() => {
    const types = searchParams?.get("types")?.split(",") || [];
    return types
      .filter((type) => type.trim() !== "")
      .map((type) => ({ value: type, label: type }));
  }, [searchParams]);

  const { setFilteredRepos } = useFilterRepoState();

  useEffect(() => {
    const allIsSelected: boolean = selectedTypes.some(
      (type) => type.value === "All"
    );
    const filtered = filterAndSortRepos(repos.items, {
      searchParam,
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

    setFilteredRepos(filtered);
  }, [
    repos.items,
    searchParam,
    selectedLanguages,
    selectedTypes,
    setFilteredRepos,
  ]);

  const debouncedUpdateSearchParams = useMemo<
    (params: IUpdateSearchParams) => void
  >(
    () =>
      debounce(({ param, value }: IUpdateSearchParams) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set(param, value);
        router.replace(`${pathname}?${newParams.toString()}`);
      }, 300),
    [searchParams, pathname, router]
  );

  const updateSearchParams = useCallback<
    ({ param, value }: IUpdateSearchParams) => void
  >(
    ({ param, value }: IUpdateSearchParams) => {
      debouncedUpdateSearchParams({ param, value });
    },
    [debouncedUpdateSearchParams]
  );

  return {
    searchValue,
    setSearchValue,
    updateSearchParams,
    selectedLanguages,
    selectedTypes,
  };
};
