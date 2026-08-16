const navLinks = [
  { id: 1, name: "Projects" },
  { id: 2, name: "Skill" },
  { id: 3, name: "Experience" },
  { id: 4, name: "Resume" },
];

const navIcons = [
  { id: 1, img: "/icons/wifi.svg" },
  { id: 1, img: "/icons/search.svg" },
  { id: 1, img: "/icons/user.svg" },
  { id: 1, img: "/icons/mode.svg" },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Certificates",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills",
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash.png",
    canOpen: true,
  },
];

export { navLinks, navIcons, dockApps };
