import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, ChevronRight, Search } from "lucide-react"
import { WindowControls } from "#components"
import windowWrapper from "#hoc/windowWrapper"
import { locations } from "#constants/index.js"
import useLocationStore from "#store/location"
import clsx from "clsx"
import useWindowStore from "#store/window"

const projectDirectory = locations.work.children?.find(
  (item) =>
    item.type === "projects" ||
    item.id === "projects" ||
    item.name === "Projects",
)

// The data model also supports project groupings such as Full Stack and
// Frontend. Finder's Work directory should expose the projects themselves,
// while About, Resume, and Trash remain separate root directories.
const workDirectory = projectDirectory
  ? {
      ...projectDirectory,
      id: "finder-work",
      type: "work",
      name: "Work",
      children:
        projectDirectory.children?.flatMap((item) =>
          item.kind === "folder" && item.children?.length
            ? item.children
            : [item],
        ) ?? [],
    }
  : locations.work

const finderDirectories = [
  workDirectory,
  locations.about,
  locations.resume,
  locations.trash,
]

const Finder = () => {
  const { openWindow } = useWindowStore()
  const {
    activeLocation,
    history,
    future,
    navigateTo,
    setActiveLocation,
    goBack,
    goForward,
  } = useLocationStore()
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume")
    if (item.kind === "folder") return navigateTo(item)
    if (["fig", "url"].includes(item.fileType) && item.href) {
      return window.open(item.href, "_blank", "noopener,noreferrer")
    }
    openWindow(`${item.fileType}${item.kind}`, item)
  }

  const displayedLocation =
    activeLocation === locations.work ? workDirectory : activeLocation

  const allItems = useMemo(() => {
    const items = []
    const walk = (node) => {
      node?.children?.forEach((child) => {
        items.push(child)
        if (child.kind === "folder") walk(child)
      })
    }
    finderDirectories.forEach(walk)
    return items
  }, [])

  const visibleItems = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase()
    if (!trimmedQuery) return displayedLocation?.children ?? []

    return allItems.filter((item) =>
      item.name.toLowerCase().includes(trimmedQuery),
    )
  }, [allItems, displayedLocation, query])

  const getLocationPath = () => {
    if (
      displayedLocation === workDirectory ||
      displayedLocation === locations.work
    ) {
      return [workDirectory]
    }

    if (workDirectory.children?.some((item) => item === displayedLocation)) {
      return [workDirectory, displayedLocation]
    }

    const path = []
    const findPath = (node) => {
      if (!node) return false
      path.push(node)
      // Location ids are not guaranteed to be unique across nested files in
      // older portfolio data. Compare the actual location object so About
      // cannot resolve to a project child that happens to share its id.
      if (node === activeLocation) return true
      if (node.children?.some(findPath)) return true
      path.pop()
      return false
    }

    finderDirectories.some(findPath)
    return path.length ? path : [displayedLocation]
  }

  const locationPath = getLocationPath()

  const renderSidebarList = (name, items) => (
    <div className="finder-sidebar-section">
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setSelectedId(null)
              if (item === workDirectory && activeLocation === locations.work) {
                setActiveLocation(workDirectory, { history: [] })
              } else {
                navigateTo(item)
              }
            }}
            className={clsx(
              item === activeLocation ||
                (item === workDirectory && activeLocation === locations.work)
                ? "active"
                : "not-active",
            )}
          >
            <img src={item.icon} alt="" />
            <p title={item.name}>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <div className="finder-titlebar">
          <span className="finder-titlebar__dot" aria-hidden="true" />
          <span>Finder</span>
        </div>
        <span className="finder-window-spacer" aria-hidden="true" />
      </div>

      <div className="finder-body">
        <aside className="sidebar" aria-label="Finder sidebar">
          {renderSidebarList("Favorites", [
            ...finderDirectories,
          ])}
          {renderSidebarList("Work", workDirectory.children)}
        </aside>

        <div className="finder-main">
          <div className="finder-toolbar">
            <div className="finder-navigation" aria-label="Finder navigation">
              <button
                type="button"
                aria-label="Back"
                title="Back"
                disabled={!history.length}
                onClick={goBack}
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                aria-label="Forward"
                title="Forward"
                disabled={!future.length}
                onClick={goForward}
              >
                <ArrowRight />
              </button>
            </div>

            <nav className="finder-breadcrumbs" aria-label="Current location">
              {locationPath.map((location, index) => (
                <span className="finder-breadcrumb" key={location.id}>
                  {index > 0 && <ChevronRight aria-hidden="true" />}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(null)
                      setActiveLocation(location)
                    }}
                    className={index === locationPath.length - 1 ? "current" : ""}
                  >
                    {location.name}
                  </button>
                </span>
              ))}
            </nav>

            <label className="finder-search">
              <Search aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setSelectedId(null)
                }}
                placeholder="Search"
                aria-label="Search Finder"
              />
            </label>
          </div>

          <div className="finder-content" aria-live="polite">
            {visibleItems.length ? (
              <ul className="content" aria-label={`${displayedLocation?.name} contents`}>
                {visibleItems.map((item) => (
                  <li
                    key={item.id}
                    className={clsx(
                      selectedId === item.id && "is-selected",
                      item.kind === "folder" && "is-folder",
                    )}
                    onClick={() => setSelectedId(item.id)}
                    onDoubleClick={() => openItem(item)}
                    title={item.name}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") openItem(item)
                    }}
                  >
                    <span className="finder-item-icon">
                      <img src={item.icon} alt="" />
                    </span>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="finder-empty">
                <Search aria-hidden="true" />
                <p>No items found</p>
                <span>Try a different search.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const FinderWindow = windowWrapper(Finder, "finder")

export default FinderWindow