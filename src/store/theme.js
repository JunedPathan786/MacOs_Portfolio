import { create } from "zustand";
import { persist } from "zustand/middleware";

const applyTheme = (mode) => {
  document.documentElement.classList.toggle("dark", mode === "dark");
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: "light", // "light" | "dark"

      toggleMode: () => {
        const next = get().mode === "light" ? "dark" : "light";
        applyTheme(next);
        set({ mode: next });
      },

      setMode: (mode) => {
        applyTheme(mode);
        set({ mode });
      },
    }),
    {
      name: "portfolio-theme", // localStorage key
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.mode);
      },
    },
  ),
);

export default useThemeStore;