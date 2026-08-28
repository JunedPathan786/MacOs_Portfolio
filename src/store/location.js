import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { locations } from "#constants"

const DEFAULT_LOCATION = locations.work

const useLocationStore = create(immer((set) => ({
  activeLocation: DEFAULT_LOCATION,
  history: [],
  future: [],

  setActiveLocation: (location, options = {}) =>
    set((state) => {
      if (!location) return

      state.activeLocation = location
      state.history = options.history ?? []
      state.future = []
    }),

  navigateTo: (location) =>
    set((state) => {
      if (!location || location.id === state.activeLocation?.id) return

      state.history.push(state.activeLocation)
      state.activeLocation = location
      state.future = []
    }),

  goBack: () =>
    set((state) => {
      const previous = state.history.pop()
      if (!previous) return

      state.future.unshift(state.activeLocation)
      state.activeLocation = previous
    }),

  goForward: () =>
    set((state) => {
      const next = state.future.shift()
      if (!next) return

      state.history.push(state.activeLocation)
      state.activeLocation = next
    }),

  resetActiveLocation: () =>
    set((state) => {
      state.activeLocation = DEFAULT_LOCATION
      state.history = []
      state.future = []
    }),
})))

export default useLocationStore