import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  ChevronLeft,
  Check,
  Flag,
  Search,
  Download,
  Wifi,
  Signal,
  BatteryFull,
  Folder,
  Info,
  MoveRight,
} from "lucide-react";

import {
  PROFILE,
  techStack,
  blogPosts,
  socials,
  gallery,
  locations,
  dockApps,
} from "#constants/index.js";

// Apps that appear as a fixed dock at the bottom of the home screen —
// mirrors the desktop Dock 1:1 (same ids/icons), minus the disabled trash.
const DOCK_APP_IDS = ["finder", "safari", "photos", "contact"];
const dockScreenApps = dockApps.filter((app) => DOCK_APP_IDS.includes(app.id));

// Apps that sit in the home-screen grid above the dock.
const gridApps = [
  { id: "resume", name: "Resume", icon: "/images/pdf.png" },
  { id: "about", name: "About Me", icon: "/icons/info.svg" },
  { id: "techstack", name: "Tech Stack", icon: "/images/terminal.png" },
];

const allPhotos = [
  ...gallery.featured.map((item) => ({ ...item, key: `featured-${item.id}` })),
  ...gallery.journey
    .filter((item) => item.img)
    .map((item) => ({ ...item, key: `journey-${item.id}` })),
];

const aboutFile = locations.about.children.find((c) => c.fileType === "txt");
const resumeFile = locations.resume.children[0];

const StatusBar = () => {
  const [time, setTime] = useState(dayjs().format("h:mm"));

  useEffect(() => {
    const timer = setInterval(() => setTime(dayjs().format("h:mm")), 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-black shrink-0">
      <span className="text-sm font-semibold tabular-nums">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <BatteryFull size={16} strokeWidth={2} />
      </div>
    </div>
  );
};

const ScreenHeader = ({ title, onBack }) => (
  <div className="relative flex items-center justify-center px-4 py-3 border-b border-black/10 shrink-0 bg-white">
    <button
      type="button"
      onClick={onBack}
      className="absolute left-2 flex items-center gap-0.5 text-blue-500 active:opacity-60"
    >
      <ChevronLeft size={22} />
      <span className="text-[15px]">Go back</span>
    </button>
    <h1 className="text-[15px] font-semibold truncate max-w-[55%]">{title}</h1>
  </div>
);

const HomeIcon = ({ icon, name, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
  >
    <span className="flex size-14 items-center justify-center rounded-2xl bg-white/90 shadow-lg backdrop-blur">
      <img src={icon} alt="" className="size-8 object-contain" />
    </span>
    <span className="text-xs font-medium text-white drop-shadow">{name}</span>
  </button>
);

// ---------- Screens ----------

const AboutScreen = () => (
  <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
    <img
      src={PROFILE.avatar}
      alt={PROFILE.name}
      className="size-20 rounded-full object-cover"
    />
    {aboutFile?.subtitle ? (
      <h2 className="text-xl font-bold">{aboutFile.subtitle}</h2>
    ) : null}
    <div className="space-y-4 leading-relaxed text-[15px] text-gray-800">
      {aboutFile?.description?.map((para, idx) => <p key={idx}>{para}</p>)}
    </div>
  </div>
);

const TechStackScreen = () => (
  <div className="flex-1 overflow-y-auto p-5 space-y-4 font-roboto text-sm bg-white">
    <p className="text-gray-500">Techstack</p>
    <div className="flex gap-6 border-b border-black/10 pb-2 text-gray-500">
      <p className="w-28">Category</p>
      <p>Technologies</p>
    </div>
    <ul className="space-y-3">
      {techStack.map(({ category, items }) => (
        <li key={category} className="flex gap-6 items-start">
          <span className="flex items-center gap-1.5 w-28 shrink-0 text-green-600 font-medium">
            <Check size={16} /> {category}
          </span>
          <span className="text-gray-700">{items.join(", ")}</span>
        </li>
      ))}
    </ul>
    <div className="pt-3 mt-3 border-t border-black/10 space-y-1 text-green-600">
      <p className="flex items-center gap-1.5">
        <Check size={16} /> {techStack.length} of {techStack.length} stacks
        loaded successfully (100%)
      </p>
      <p className="flex items-center gap-1.5 text-black">
        <Flag size={12} fill="black" /> Render time: 6ms
      </p>
    </div>
  </div>
);

const ContactScreen = () => (
  <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
    <img
      src={PROFILE.avatar}
      alt={PROFILE.name}
      className="size-20 rounded-full object-cover mx-auto"
    />
    <h2 className="text-xl font-bold text-center">Let's Connect</h2>
    <p className="text-center text-gray-600">
      Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
    </p>

    <a
      href="mailto:junedp068@gmail.com"
      className="block rounded-xl px-4 py-3.5 text-white font-medium"
      style={{ backgroundColor: "#4bcb63" }}
    >
      Email me — junedp068@gmail.com
    </a>

    <ul className="space-y-3">
      {socials.map(({ id, bg, link, icon, text }) => (
        <li key={id}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-white font-medium"
            style={{ backgroundColor: bg }}
          >
            <img src={icon} alt="" className="size-5" />
            {text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SafariScreen = () => (
  <div className="flex-1 flex flex-col bg-white min-h-0">
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-red-500 font-bold text-lg mb-4">My Developer Blog</h2>
      <div className="space-y-6">
        {blogPosts.map(({ id, image, title, date, link }) => (
          <div key={id} className="flex gap-3">
            <img src={image} alt="" className="size-16 rounded-lg object-cover shrink-0" />
            <div className="min-w-0 space-y-1">
              <p className="text-xs text-gray-500">{date}</p>
              <h3 className="text-sm font-semibold leading-snug">{title}</h3>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 inline-flex items-center gap-1"
              >
                Check out the full post <MoveRight size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="shrink-0 border-t border-black/10 p-2">
      <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-500 text-sm">
        <Search size={15} />
        <span>Search or enter website name</span>
      </div>
    </div>
  </div>
);

const PhotosScreen = ({ onOpenImage }) => (
  <div className="flex-1 overflow-y-auto p-1.5 bg-white">
    <div className="grid grid-cols-2 gap-1.5">
      {allPhotos.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onOpenImage(item)}
          className="aspect-square overflow-hidden rounded-md"
        >
          <img
            src={item.img}
            alt={item.title || ""}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  </div>
);

const ImageScreen = ({ item }) => (
  <div className="flex-1 flex items-center justify-center bg-black p-4">
    <img
      src={item.imageUrl || item.img}
      alt={item.name || item.title || ""}
      className="max-w-full max-h-full object-contain rounded"
    />
  </div>
);

const FileDetailScreen = ({ item }) => (
  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
    <h2 className="text-lg font-bold">{item.name}</h2>
    <div className="space-y-3 leading-relaxed text-[15px] text-gray-800">
      {item.description?.map((para, idx) => <p key={idx}>{para}</p>)}
    </div>
  </div>
);

const ProjectScreen = ({ project, onOpenChild }) => (
  <div className="flex-1 overflow-y-auto bg-white">
    <ul className="divide-y divide-black/5">
      {project.children.map((child) => (
        <li key={child.id}>
          <button
            type="button"
            onClick={() => onOpenChild(child)}
            className="w-full flex items-center gap-3 px-5 py-3.5 text-left active:bg-gray-50"
          >
            <img src={child.icon} alt="" className="size-6 object-contain shrink-0" />
            <span className="text-[15px] truncate">{child.name}</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ResumeScreen = () => (
  <div className="flex-1 flex flex-col min-h-0 bg-white">
    <div className="flex justify-end p-2 border-b border-black/10 shrink-0">
      <a
        href="/files/resume.pdf"
        download
        className="flex items-center gap-1.5 text-sm text-blue-500 px-2 py-1"
      >
        <Download size={16} /> Download
      </a>
    </div>
    <iframe
      src="/files/resume.pdf"
      title="Resume"
      className="flex-1 w-full border-0"
    />
  </div>
);

const FinderScreen = ({ tab, onTab, onOpenProject, onOpenResume }) => {
  const projects = locations.work.children;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <div className="flex-1 overflow-y-auto">
        {tab === "work" ? (
          <ul className="divide-y divide-black/5">
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left active:bg-gray-50"
                >
                  <img src="/images/folder.png" alt="" className="size-6 shrink-0" />
                  <span className="text-[15px] truncate">{project.name}</span>
                </button>
              </li>
            ))}
            {resumeFile ? (
              <li>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left active:bg-gray-50"
                >
                  <img src={resumeFile.icon} alt="" className="size-6 shrink-0" />
                  <span className="text-[15px] truncate">{resumeFile.name}</span>
                </button>
              </li>
            ) : null}
          </ul>
        ) : (
          <AboutScreen />
        )}
      </div>
      <div className="shrink-0 flex border-t border-black/10 bg-white">
        <button
          type="button"
          onClick={() => onTab("work")}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs ${
            tab === "work" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <Folder size={20} />
          Work
        </button>
        <button
          type="button"
          onClick={() => onTab("about")}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs ${
            tab === "about" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <Info size={20} />
          About Me
        </button>
      </div>
    </div>
  );
};

const TITLES = {
  about: "About Me",
  techstack: "Tech Stack",
  contact: "Contact Me",
  safari: "Safari",
  photos: "All Photos",
  resume: "Resume",
  finder: "Work",
};

// ---------- Root ----------

const MobileApp = () => {
  const [stack, setStack] = useState([]);
  const current = stack[stack.length - 1];

  const push = (entry) => setStack((s) => [...s, entry]);
  const back = () => setStack((s) => s.slice(0, -1));
  const updateTop = (patch) =>
    setStack((s) => {
      if (!s.length) return s;
      const copy = [...s];
      copy[copy.length - 1] = { ...copy[copy.length - 1], ...patch };
      return copy;
    });

  const openHomeApp = (id) => {
    if (id === "finder") return push({ id: "finder", tab: "work" });
    push({ id });
  };

  let title = "";
  let body = null;

  if (current) {
    switch (current.id) {
      case "about":
        title = TITLES.about;
        body = <AboutScreen />;
        break;
      case "techstack":
        title = TITLES.techstack;
        body = <TechStackScreen />;
        break;
      case "contact":
        title = TITLES.contact;
        body = <ContactScreen />;
        break;
      case "safari":
        title = TITLES.safari;
        body = <SafariScreen />;
        break;
      case "photos":
        title = TITLES.photos;
        body = (
          <PhotosScreen
            onOpenImage={(item) => push({ id: "file-image", item })}
          />
        );
        break;
      case "resume":
        title = TITLES.resume;
        body = <ResumeScreen />;
        break;
      case "finder":
        title = TITLES.finder;
        body = (
          <FinderScreen
            tab={current.tab}
            onTab={(tab) => updateTop({ tab })}
            onOpenProject={(project) => push({ id: "project", project })}
            onOpenResume={() => push({ id: "resume" })}
          />
        );
        break;
      case "project":
        title = current.project.name;
        body = (
          <ProjectScreen
            project={current.project}
            onOpenChild={(child) => {
              if (child.fileType === "url" && child.href) {
                window.open(child.href, "_blank", "noopener,noreferrer");
                return;
              }
              if (child.fileType === "img") {
                push({ id: "file-image", item: child });
                return;
              }
              push({ id: "file-detail", item: child });
            }}
          />
        );
        break;
      case "file-detail":
        title = current.item.name;
        body = <FileDetailScreen item={current.item} />;
        break;
      case "file-image":
        title = current.item.name || current.item.title || "Photo";
        body = <ImageScreen item={current.item} />;
        break;
      default:
        break;
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      <StatusBar />

      {current ? (
        <>
          <ScreenHeader title={title} onBack={back} />
          {body}
        </>
      ) : (
        <div
          className="flex-1 flex flex-col bg-cover bg-center"
          style={{ backgroundImage: "url('/images/wallpaper.jpg')" }}
        >
          <div className="grid grid-cols-3 gap-y-6 px-6 pt-8">
            {gridApps.map((app) => (
              <HomeIcon
                key={app.id}
                icon={app.icon}
                name={app.name}
                onClick={() => openHomeApp(app.id)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center text-white">
            <p className="text-sm font-medium opacity-90 drop-shadow">
              Hey, I'm {PROFILE.name.split(" ")[0]}.
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight drop-shadow-lg">
              {PROFILE.role}
            </h1>
            <p className="mt-3 max-w-xs text-sm opacity-90 drop-shadow">
              Building scalable web applications and AI-powered products.
            </p>
          </div>

          <div className="mx-3 mb-3 rounded-3xl bg-white/30 backdrop-blur-xl p-3">
            <div className="flex justify-around">
              {dockScreenApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => openHomeApp(app.id)}
                  className="flex size-14 items-center justify-center rounded-2xl bg-white/90 shadow-lg active:scale-95 transition-transform"
                >
                  <img
                    src={`/images/${app.icon}`}
                    alt={app.name}
                    className="size-8 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="shrink-0 flex justify-center py-2 bg-white">
        <div className="h-1 w-32 rounded-full bg-black/80" />
      </div>
    </div>
  );
};

export default MobileApp;