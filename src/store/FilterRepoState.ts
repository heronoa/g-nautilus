import { create } from "zustand";
import { IRepository } from "@/types";

interface FilterRepoState {
  filteredRepos: IRepository[];
  setFilteredRepos: (repos: IRepository[]) => void;
}

export const useFilterRepoState = create<FilterRepoState>((set) => ({
  filteredRepos: [],
  setFilteredRepos: (repos) => set({ filteredRepos: repos }),
}));
