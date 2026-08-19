import { useEffect, useMemo, useRef } from "react";
import { Search, X } from "lucide-react";
import useSearchStore from "#store/search";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { navLinks, dockApps, socials, locations } from "#constants";

// Builds a flat, searchable index out of the data you already have in
// constants/index.js — no need to duplicate anything there.
const buildIndex = () => {
  const items = [];

  navLinks.forEach(({ id, name, type }) => {
    items.push({
      id: `nav-${id}`,
      title: name,
      section: "Menu",
      action: "window",
      target: type,
    });
  });

  dockApps
    .filter((app) => app.canOpen)
    .forEach((app) => {
      items.push({
        id: `dock-${app.id}`,
        title: app.name,
        section: "Apps",
        action: "window",
        target: app.id,
      });
    });

  locations.work.children.forEach((project) => {
    items.push({
      id: `project-${project.id}`,
      title: project.name,
      section: "Projects",
      action: "location",
      target: project,
    });
  });

  socials.forEach(({ id, text, link }) => {
    items.push({
      id: `social-${id}`,
      title: text,
      section: "Socials",
      action: "link",
      target: link,
    });
  });

  return items;
};

const SearchOverlay = () => {
  const { isOpen, query, close, toggle, setQuery } = useSearchStore();
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const inputRef = useRef(null);

  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    if (!query.trim()) return index;
    const q = query.toLowerCase();
    return index.filter((item) => item.title.toLowerCase().includes(q));
  }, [index, query]);

  // Cmd/Ctrl+K opens it from anywhere, Escape closes it.
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
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (item) => {
    if (item.action === "window") openWindow(item.target);
    if (item.action === "location") {
      setActiveLocation(item.target);
      openWindow("finder");
    }
    if (item.action === "link") window.open(item.target, "_blank");
    close();
  };

  return (
    <div
      id="search-overlay"
      className="fixed inset-0 z-[999] flex-center bg-black/30 backdrop-blur-sm dark:bg-black/50"
      onClick={close}
    >
      <div
        className="w-full max-w-md mx-4 rounded-2xl bg-white/80 backdrop-blur-2xl shadow-2xl overflow-hidden dark:bg-neutral-900/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 dark:border-white/10">
          <Search className="w-4 h-4 opacity-60" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, apps, links..."
            className="flex-1 bg-transparent outline-none text-sm dark:text-white"
          />
          <button onClick={close} aria-label="Close search">
            <X className="w-4 h-4 opacity-60" />
          </button>
        </div>

        <ul className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-3 text-sm opacity-60">No results</li>
          )}

          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
            >
              <span>{item.title}</span>
              <span className="text-xs opacity-50">{item.section}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchOverlay;