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

const techStack = [
  {
    category: "Frontend:",
    items: ["HTML", "CSS", "JS", "React", "Tailwind CSS"],
  },
  {
    category: "Languages:",
    items: ["C", "Python", "Bash"],
  },
  {
    category: "Backend:",
    items: ["Appwrite"],
  },
  {
    category: "Creative:",
    items: ["GSAP", "Blender", "DaVinci Resolve", "CapCut"],
  },
  {
    category: "Env & Editor:",
    items: ["Arch Linux", "Hyprland", "Neovim", "Ghostty"],
  },
  {
    category: "(Learning):",
    items: ["TS", "Next.js", "React Native"],
  },
  {
    category: "(Planned):",
    items: ["Three.js", "WebGL", "WebGPU"],
  },
];

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null }
};

export { navLinks, navIcons, dockApps, techStack,  INITIAL_Z_INDEX, WINDOW_CONFIG };
