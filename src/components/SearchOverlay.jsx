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
import { navLinks, dockApps, socials, locations } from "#constants";

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

// Builds a flat, searchable index out of constants/index.js so search stays
// live without duplicating portfolio data in this component.
const buildIndex = () => {
  const items = [];

  navLinks.forEach(({ id, name, type }) => {
    items.push({
      id: `nav-${id}`,
      title: name,
      section: "Menu",
      detail: `Open ${name}`,
      action: "app",
      target: type,
      searchText: `${name} menu ${type}`,
    });
  });

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
    if (item.action === "app") openWindow(item.target);
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
      className="fixed inset-0 z-[999] flex items-start justify-center bg-black/30 px-4 pt-[12vh] backdrop-blur-sm dark:bg-black/50"
      onClick={close}
    >
      <div
        className="grid w-full max-w-3xl overflow-hidden rounded-2xl border border-white/50 bg-white/85 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-950/85 md:grid-cols-[1fr_260px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3 dark:border-white/10">
            <Search className="size-5 shrink-0 text-gray-500 dark:text-gray-400" />
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
              className="min-w-0 flex-1 bg-transparent text-lg font-medium text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
              spellCheck={false}
            />
            <div className="hidden items-center gap-1 rounded-md bg-black/5 px-2 py-1 text-xs font-semibold text-gray-500 dark:bg-white/10 dark:text-gray-400 sm:flex">
              <Command className="size-3.5" />
              <span>K</span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="rounded-md p-1 text-gray-500 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          <ul className="max-h-96 overflow-y-auto py-2">
            {results.length === 0 && (
              <li className="px-5 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                No results found.
              </li>
            )}

            {results.map((item, index) => (
              <li
                key={item.id}
                ref={(node) => {
                  resultRefs.current[index] = node;
                }}
                onMouseEnter={() => {
                  setSelectedIndex(index);
                  setHoveredItem(item);
                }}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleSelect(item)}
                className={`mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm
                    transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${index === selectedIndex
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-800 hover:bg-black/5 hover:scale-[1.01] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:text-gray-200 dark:hover:bg-white/10"
                  }`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${index === selectedIndex
                    ? "bg-white/20"
                    : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                    }`}
                >
                  {getItemIcon(item)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">
                    {item.title}
                  </span>
                  <span
                    className={`block truncate text-xs ${index === selectedIndex
                      ? "text-blue-100"
                      : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    {item.detail}
                  </span>
                </span>
                <span
                  className={`shrink-0 text-xs font-medium ${index === selectedIndex
                    ? "text-blue-100"
                    : "text-gray-400 dark:text-gray-500"
                    }`}
                >
                  {getItemType(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="hidden border-l border-black/10 p-4 dark:border-white/10 md:block">
          {previewItem ? (
            <div className="sticky top-4 rounded-xl bg-black/5 p-4 text-gray-800 dark:bg-white/10 dark:text-gray-100">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/70 text-blue-600 shadow-sm dark:bg-black/30 dark:text-blue-300">
                {getItemIcon(previewItem)}
              </div>
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                {previewItem.section}
              </p>
              <h3 className="mt-1 text-base font-bold leading-snug">
                {previewItem.title}
              </h3>
              <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {previewItem.detail}
              </p>
              <p className="mt-4 text-xs font-medium text-blue-600 dark:text-blue-300">
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
