import { useState } from "react";
import {
  Mail,
  Search,
  Sparkles,
  Command,
  MousePointer2,
  Move,
  AppWindow,
  SunMoon,
} from "lucide-react";
import clsx from "clsx";
import WindowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants/index.js";
import useWindowStore from "#store/window";

const MOMENT_ICONS = {
  loader: Sparkles,
  search: Command,
  dock: MousePointer2,
  drag: Move,
  window: AppWindow,
  theme: SunMoon,
};

const openImage = (openWindow, { id, title, img }) =>
  openWindow("imgfile", {
    id,
    name: title || "Gallery image",
    icon: "/images/image.png",
    kind: "file",
    fileType: "img",
    imageUrl: img,
  });

const Photos = () => {
  const { openWindow } = useWindowStore();
  const [activeCategory, setActiveCategory] = useState(photosLinks[0].id);

  const items = gallery[activeCategory] ?? [];

  const renderContent = () => {
    if (activeCategory === "journey") {
      return (
        <ol className="gallery-timeline">
          {items.map(({ id, period, title, place, img }) => (
            <li key={id}>
              {img && (
                <img
                  src={img}
                  alt={title}
                  className="gallery-timeline__thumb"
                  loading="lazy"
                  decoding="async"
                  onClick={() => openImage(openWindow, { id, title, img })}
                />
              )}
              <div className="gallery-timeline__body">
                {period && (
                  <span className="gallery-timeline__period">{period}</span>
                )}
                <p className="gallery-timeline__title">{title}</p>
                <p className="gallery-timeline__place">{place}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    }

    if (activeCategory === "favorites") {
      return (
        <ul className="gallery-favorites">
          {items.map(({ id, title, note }) => (
            <li key={id}>
              <p className="gallery-favorites__title">{title}</p>
              <p className="gallery-favorites__note">{note}</p>
            </li>
          ))}
        </ul>
      );
    }

    if (activeCategory === "experiments" || activeCategory === "ui-motion") {
      return (
        <ul className="gallery-moments">
          {items.map(({ id, kind, title, description }) => {
            const Icon = MOMENT_ICONS[kind] ?? Sparkles;
            return (
              <li key={id} tabIndex={0}>
                <Icon className="gallery-moments__icon" aria-hidden="true" />
                <p className="gallery-moments__title">{title}</p>
                <p className="gallery-moments__description">{description}</p>
              </li>
            );
          })}
        </ul>
      );
    }
    
    return (
      <ul className="gallery-grid">
        {items.map(({ id, img, title, size }) => (
          <li
            key={id}
            className={size === "lg" ? "gallery-grid__lg" : undefined}
            onClick={() => openImage(openWindow, { id, title, img })}
          >
            <img
              src={img}
              alt={title || `Gallery image ${id}`}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex h-full">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul role="tablist" aria-label="Gallery categories">
            {photosLinks.map(({ id, icon, title }) => (
              <li
                key={id}
                role="tab"
                tabIndex={0}
                aria-selected={id === activeCategory}
                className={clsx(
                  id === activeCategory ? "active" : "not-active",
                )}
                onClick={() => setActiveCategory(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveCategory(id);
                  }
                }}
              >
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  className="dark:invert"
                />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          {items.length === 0 ? (
            <p className="gallery-empty">Nothing here yet.</p>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
PhotosWindow.displayName = "Photos";

export default PhotosWindow;
