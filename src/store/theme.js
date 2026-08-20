import { create } from "zustand";
import { persist } from "zustand/middleware";

const getSystemMode = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (mode) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: getSystemMode(), // "light" | "dark"

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

applyTheme(useThemeStore.getState().mode);

export default useThemeStore;
