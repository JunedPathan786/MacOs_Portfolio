import { useEffect, useMemo, useRef, useState } from "react";
import {
  AppWindow,
  Command,
  ExternalLink,
  FileText,
  Folder,
  Image as ImageIcon,
  Search,
  X,
} from "lucide-react";
import useSearchStore from "#store/search";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import {
  dockApps,
  socials,
  locations,
  getAppLaunchTarget,
} from "#constants";

const getItemIcon = (item) => {
  if (item.icon) {
    return (
      <img
        src={item.icon.startsWith("/") ? item.icon : `/images/${item.icon}`}
        alt=""
        className="size-8 object-contain"
        aria-hidden="true"
      />
    );
  }

  if (item.fileType === "img") return <ImageIcon className="size-5" />;
  if (item.fileType === "txt" || item.fileType === "pdf") {
    return <FileText className="size-5" />;
  }
  if (item.kind === "folder") return <Folder className="size-5" />;
  if (item.action === "link") return <ExternalLink className="size-5" />;
  return <AppWindow className="size-5" />;
};

const getItemType = (item) => {
  if (item.action === "app") return "Application";
  if (item.action === "link") return "Web link";
  if (item.kind === "folder") return "Folder";
  if (item.fileType === "pdf") return "PDF";
  if (item.fileType === "img") return "Image";
  if (item.fileType === "txt") return "Text file";
  return item.section;
};

const buildIndex = () => {
  const items = [];

  dockApps
    .filter((app) => app.canOpen)
    .forEach((app) => {
      items.push({
        id: `dock-${app.id}`,
        title: app.name,
        section: "Apps",
        detail: `Launch ${app.name}`,
        icon: app.icon,
        action: "app",
        target: app.id,
        searchText: `${app.name} app ${app.id}`,
      });
    });

  const walkLocation = (node, section = "Files") => {
    if (!node) return;

    if (node.id && node.name) {
      items.push({
        id: `location-${section}-${node.id}-${node.name}`,
        title: node.name,
        section,
        detail: node.description?.[0] ?? `Open ${node.name}`,
        icon: node.icon,
        kind: node.kind,
        fileType: node.fileType,
        action: "location",
        target: node,
        searchText: [
          node.name,
          section,
          node.kind,
          node.fileType,
          node.href,
          ...(node.description ?? []),
        ]
          .filter(Boolean)
          .join(" "),
      });
    }

    if (Array.isArray(node.children)) {
      node.children.forEach((child) =>
        walkLocation(child, node.name ?? section),
      );
    }
  };

  Object.values(locations).forEach((location) =>
    walkLocation(location, location.name),
  );

  socials.forEach(({ id, text, link }) => {
    items.push({
      id: `social-${id}`,
      title: text,
      section: "Socials",
      detail: link,
      action: "link",
      target: link,
      searchText: `${text} social ${link}`,
    });
  });

  return items;
};

const SearchOverlay = () => {
  const { isOpen, query, close, toggle, setQuery } = useSearchStore();
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const inputRef = useRef(null);
  const resultRefs = useRef([]);

  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? index.filter((item) =>
          `${item.title} ${item.searchText} ${item.detail}`
            .toLowerCase()
            .includes(q),
        )
      : index.filter((item) =>
          ["Apps", "Menu", "Projects"].includes(item.section),
        );

    return pool.slice(0, 8);
  }, [index, query]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, toggle]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    resultRefs.current[selectedIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [selectedIndex]);

  if (!isOpen) return null;

  const handleSelect = (item) => {
    if (item.action === "app") {
      const launch = getAppLaunchTarget(item.target);
      if (launch) {
        const { windowKey, location, history } = launch;
        if (location) setActiveLocation(location, { history: history ?? [] });
        openWindow(windowKey);
      } else {
        // Menu items (Projects/Contact/Resume) already carry a real window
        // key as their target.
        openWindow(item.target);
      }
    }
    if (item.action === "location") {
      if (item.target.fileType === "pdf") {
        openWindow("resume");
      } else if (item.target.kind === "folder") {
        setActiveLocation(item.target);
        openWindow("finder");
      } else if (
        ["fig", "url"].includes(item.target.fileType) &&
        item.target.href
      ) {
        window.open(item.target.href, "_blank");
      } else {
        openWindow(`${item.target.fileType}${item.target.kind}`, item.target);
      }
    }
    if (item.action === "link") window.open(item.target, "_blank");
    close();
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(
        (current) => (current + 1) % Math.max(results.length, 1),
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex(
        (current) =>
          (current - 1 + Math.max(results.length, 1)) %
          Math.max(results.length, 1),
      );
    }

    if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const previewItem = hoveredItem ?? results[selectedIndex];

  return (
    <div
      id="search-overlay"
      className="search-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Search portfolio"
    >
      <div
        className="search-overlay__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-overlay__main">
          <div className="search-overlay__header">
            <Search className="search-overlay__search-icon" />

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
                setHoveredItem(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search apps, projects, files, links..."
              className="search-overlay__input"
              spellCheck={false}
              aria-label="Search apps, projects, files, and links"
              aria-controls="search-results"
            />

            <div className="search-overlay__shortcut">
              <Command className="search-overlay__command-icon" />
              <span>K</span>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="search-overlay__close"
            >
              <X className="search-overlay__close-icon" />
            </button>
          </div>

          <ul
            id="search-results"
            className="search-overlay__results"
            role="listbox"
          >
            {results.length === 0 && (
              <li className="search-overlay__empty">No results found.</li>
            )}

            {results.map((item, index) => (
              <li
                key={item.id}
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={-1}
                ref={(node) => {
                  resultRefs.current[index] = node;
                }}
                onMouseEnter={() => {
                  setSelectedIndex(index);
                  setHoveredItem(item);
                }}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleSelect(item)}
                className={`search-overlay__result ${
                  index === selectedIndex ? "is-selected" : ""
                }`}
              >
                <span
                  className={`search-overlay__result-icon ${
                    index === selectedIndex ? "is-selected" : ""
                  }`}
                >
                  {getItemIcon(item)}
                </span>

                <span className="search-overlay__result-content">
                  <span className="search-overlay__result-title">
                    {item.title}
                  </span>

                  <span
                    className={`search-overlay__result-detail ${
                      index === selectedIndex ? "is-selected" : ""
                    }`}
                  >
                    {item.detail}
                  </span>
                </span>

                <span
                  className={`search-overlay__result-type ${
                    index === selectedIndex ? "is-selected" : ""
                  }`}
                >
                  {getItemType(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="search-overlay__preview">
          {previewItem ? (
            <div className="search-overlay__preview-card">
              <div className="search-overlay__preview-icon">
                {getItemIcon(previewItem)}
              </div>

              <p className="search-overlay__preview-section">
                {previewItem.section}
              </p>

              <h3 className="search-overlay__preview-title">
                {previewItem.title}
              </h3>

              <p className="search-overlay__preview-detail">
                {previewItem.detail}
              </p>

              <p className="search-overlay__preview-hint">
                Press Enter or click to open
              </p>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

export default SearchOverlay;