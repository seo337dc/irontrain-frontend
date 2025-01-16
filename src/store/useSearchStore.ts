import { create } from "zustand";

interface SearchStore {
  searchText: string;
  setSearchText: (query: string) => void;
  clear: () => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchText: "",
  setSearchText: (query) => set(() => ({ searchText: query })),
  clear: () => set(() => ({ searchText: "" })),
}));

export default useSearchStore;
