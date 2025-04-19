import { create } from "zustand";

interface AppState {
  selectedUsername: string | null;
  selectedRepo: string | null;
  setselectedUsername: (user: string | null) => void;
  setSelectedRepo: (repo: string | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedUsername: null,
  selectedRepo: null,
  setselectedUsername: (user) => set({ selectedUsername: user }),
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),
  reset: () => set({ selectedUsername: null, selectedRepo: null }),
}));
