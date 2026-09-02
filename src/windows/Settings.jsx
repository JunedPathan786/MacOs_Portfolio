import { WindowControls } from "#components"
import windowWrapper from "#hoc/windowWrapper"
import useThemeStore from "#store/theme"
import { PROFILE } from "#constants"

const Settings = () => {
  const { mode, setMode } = useThemeStore()

  return (
    <>
      <div id="window-header" className="shrink-0">
        <WindowControls target="settings" />
        <h2 className="text-sm font-semibold text-center flex-1 text-gray-700 dark:text-gray-200">Settings</h2>
        <span className="w-12 shrink-0" aria-hidden="true" />
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto min-h-0">
        <section className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Appearance</h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("light")}
              aria-pressed={mode === "light"}
              className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${mode === "light"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-white/10"
                }`}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setMode("dark")}
              aria-pressed={mode === "dark"}
              className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${mode === "dark"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-white/10"
                }`}
            >
              Dark
            </button>
          </div>
        </section>

        <section className="space-y-1 border-t border-gray-200 dark:border-white/10 pt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">About</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {PROFILE.name}&rsquo;s portfolio desktop.
          </p>
        </section>
      </div>
    </>
  )
}

const SettingsWindow = windowWrapper(Settings, "settings")

export default SettingsWindow
