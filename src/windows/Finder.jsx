import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, ChevronRight, Search, X } from "lucide-react"
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
    if (item.kind === "folder") {
      setQuery("")
      return navigateTo(item)
    }
    if (["fig", "url"].includes(item.fileType) && item.href) {
      return window.open(item.href, "_blank", "noopener,noreferrer")
    }
    openWindow(`${item.fileType}${item.kind}`, item)
  }

  const displayedLocation =
    activeLocation === locations.work ? workDirectory : activeLocation

  const allItems = useMemo(() => {
    const items = []
    const walk = (node, path = []) => {
      if (!node || !Array.isArray(node.children)) return
      const currentPath = [...path, node.name]
      node.children.forEach((child) => {
        const itemPath = [...currentPath]
        const uniqueKey = `${itemPath.join("/")}-${child.id}-${child.name}`
        const enrichedItem = {
          ...child,
          _uniqueKey: uniqueKey,
          _path: itemPath.slice(1).join(" / "),
          _rootSection: node.name,
        }
        items.push(enrichedItem)
        if (child.kind === "folder") {
          walk(child, itemPath)
        }
      })
    }
    finderDirectories.forEach((dir) => walk(dir, []))
    return items
  }, [])

  const trimmedQuery = query.trim().toLowerCase()
  const isSearching = trimmedQuery.length > 0

  const visibleItems = useMemo(() => {
    if (!isSearching) {
      return (displayedLocation?.children ?? []).map((child) => ({
        ...child,
        _uniqueKey: `${displayedLocation?.name ?? "root"}-${child.id}-${child.name}`,
      }))
    }

    return allItems
      .map((item) => {
        const nameLower = (item.name || "").toLowerCase()
        const kindLower = (item.kind || "").toLowerCase()
        const typeLower = (item.fileType || "").toLowerCase()
        const descText = Array.isArray(item.description)
          ? item.description.join(" ").toLowerCase()
          : (item.description || "").toLowerCase()
        const subtitleLower = (item.subtitle || "").toLowerCase()

        let score = 0
        if (nameLower === trimmedQuery) {
          score = 100
        } else if (nameLower.startsWith(trimmedQuery)) {
          score = 80
        } else if (nameLower.includes(trimmedQuery)) {
          score = 60
        } else if (typeLower === trimmedQuery || nameLower.endsWith("." + trimmedQuery)) {
          score = 50
        } else if (kindLower === trimmedQuery) {
          score = 40
        } else if (subtitleLower.includes(trimmedQuery) || descText.includes(trimmedQuery)) {
          score = 30
        }

        return { item, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)
  }, [allItems, displayedLocation, isSearching, trimmedQuery])

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
              setQuery("")
              setSelectedId(null)
              if (item === workDirectory && activeLocation === locations.work) {
                setActiveLocation(workDirectory, { history: [] })
              } else {
                navigateTo(item)
              }
            }}
            className={clsx(
              !isSearching &&
                (item === activeLocation ||
                  (item === workDirectory && activeLocation === locations.work))
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
      <div id="window-header" className="shrink-0">
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
                disabled={!history.length || isSearching}
                onClick={goBack}
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                aria-label="Forward"
                title="Forward"
                disabled={!future.length || isSearching}
                onClick={goForward}
              >
                <ArrowRight />
              </button>
            </div>

            <nav className="finder-breadcrumbs" aria-label="Current location">
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <span className="finder-search-tag">
                    <Search className="size-3" />
                    <span>Search: &ldquo;{query.trim()}&rdquo;</span>
                  </span>
                  <span className="text-xs text-gray-400">
                    ({visibleItems.length} {visibleItems.length === 1 ? "item" : "items"})
                  </span>
                </div>
              ) : (
                locationPath.map((location, index) => (
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
                ))
              )}
            </nav>

            <label className="finder-search">
              <Search aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setSelectedId(null)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setQuery("")
                  }
                }}
                placeholder="Search"
                aria-label="Search Finder"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  className="finder-search-clear"
                  onClick={() => {
                    setQuery("")
                    setSelectedId(null)
                  }}
                >
                  <X />
                </button>
              )}
            </label>
          </div>

          <div className="finder-content" aria-live="polite">
            {visibleItems.length ? (
              <ul className="content" aria-label={`${displayedLocation?.name} contents`}>
                {visibleItems.map((item) => (
                  <li
                    key={item._uniqueKey}
                    className={clsx(
                      selectedId === item._uniqueKey && "is-selected",
                      item.kind === "folder" && "is-folder",
                    )}
                    onClick={() => setSelectedId(item._uniqueKey)}
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
                    {isSearching && item._path && (
                      <span className="finder-item-path">in {item._path}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="finder-empty">
                <div className="finder-empty-icon">
                  <Search aria-hidden="true" />
                </div>
                <p>No results found for &ldquo;{query}&rdquo;</p>
                <span>Check your spelling or try searching for a different keyword or file extension.</span>
                <button
                  type="button"
                  className="finder-clear-search-btn"
                  onClick={() => setQuery("")}
                >
                  Clear search
                </button>
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