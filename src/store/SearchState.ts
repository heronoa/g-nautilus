import { create } from "zustand";

interface SearchState {
  searchInput: string;
  query: string;
  page: number;
  perPage: number;

  setSearchInput: (value: string) => void;
  submitQuery: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchInput: "",
  query: "",
  page: 1,
  perPage: 30,

  setSearchInput: (value: string) => set({ searchInput: value }),

  submitQuery: () => {
    const currentSearchInput = get().searchInput.trim();
    if (currentSearchInput.length === 0) return;

    set({
      query: currentSearchInput,
      page: 1,
    });
  },

  reset: () =>
    set({
      searchInput: "",
      query: "",
      page: 1,
      perPage: 30,
    }),
}));
