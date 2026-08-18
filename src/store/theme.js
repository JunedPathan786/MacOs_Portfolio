import { create } from "zustand";
import { persist } from "zustand/middleware";

const applyDomTheme = (theme) => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark",

      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyDomTheme(next);
        set({ theme: next });
      },

      setTheme: (theme) => {
        applyDomTheme(theme);
        set({ theme });
      },
    }),
    {
      name: "portfolio-theme",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyDomTheme(state.theme);
      },
    },
  ),
);

export default useThemeStore;
