import { create } from "zustand";

const useSearchStore = create((set) => ({
  isOpen: false,
  query: "",

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false, query: "" }),

  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
      query: state.isOpen ? "" : state.query,
    })),

  setQuery: (query) => set({ query }),
}));

export default useSearchStore;