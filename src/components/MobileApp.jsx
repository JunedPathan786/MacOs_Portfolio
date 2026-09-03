import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  ChevronLeft,
  Check,
  Flag,
  Download,
  Wifi,
  Signal,
  BatteryFull,
} from "lucide-react";

import {
  PROFILE,
  techStack,
  socials,
  locations,
  dockApps,
} from "#constants/index.js";
import { renderText, useTextHover } from "#hoc/useTextHover.jsx";

// Mobile home screen mirrors the desktop dock (about, work, resume, skills,
// contact) minus "trash" and "settings" (no mobile equivalent) and
// "project-detail" (on mobile it showed the exact same project list as
// "work", so it's dropped rather than kept as a duplicate entry point).
// First 3 sit in the icon grid, the rest in the dock.
const mobileApps = dockApps.filter(
  (app) => !["trash", "settings", "project-detail"].includes(app.id),
);
const gridApps = mobileApps.slice(0, 3);
const dockScreenApps = mobileApps.slice(3);

const aboutFile = locations.about.children.find((c) => c.fileType === "txt");

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

const SkillsScreen = () => (
  <div className="flex-1 overflow-y-auto p-5 space-y-4 font-roboto text-sm bg-white">
    <p className="text-gray-500">Skills</p>
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

const ProjectsListScreen = ({ onOpenProject }) => {
  const projects = locations.work.children;

  return (
    <div className="flex-1 overflow-y-auto bg-white">
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
      </ul>
    </div>
  );
};

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

const TITLES = {
  about: "About Me",
  work: "Work",
  resume: "Resume",
  skills: "Skills",
  contact: "Contact Me",
};

// ---------- Root ----------

const MobileApp = () => {
  const [stack, setStack] = useState([]);
  const current = stack[stack.length - 1];
  const heroKickerRef = useRef(null);
  const heroTitleRef = useRef(null);

  const push = (entry) => setStack((s) => [...s, entry]);
  const back = () => setStack((s) => s.slice(0, -1));
  const openHomeApp = (id) => push({ id });

  // Same per-letter variable-weight hover effect as the desktop hero text.
  // No-op on touch (no hover), but active for mouse/trackpad input.
  useTextHover(heroKickerRef, "subtitle");
  useTextHover(heroTitleRef, "title");

  let title = "";
  let body = null;

  if (current) {
    switch (current.id) {
      case "about":
        title = TITLES.about;
        body = <AboutScreen />;
        break;
      case "skills":
        title = TITLES.skills;
        body = <SkillsScreen />;
        break;
      case "contact":
        title = TITLES.contact;
        body = <ContactScreen />;
        break;
      case "work":
        title = TITLES.work;
        body = (
          <ProjectsListScreen
            onOpenProject={(project) => push({ id: "project", project })}
          />
        );
        break;
      case "resume":
        title = TITLES.resume;
        body = <ResumeScreen />;
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
                icon={`/images/${app.icon}`}
                name={app.name}
                onClick={() => openHomeApp(app.id)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center text-white">
            <p ref={heroKickerRef} className="opacity-90 drop-shadow">
              {renderText(
                `Hey, I'm ${PROFILE.name.split(" ")[0]}.`,
                "text-sm font-georama",
                100,
              )}
            </p>
            <h1 ref={heroTitleRef} className="mt-2 leading-tight drop-shadow-lg">
              {renderText(PROFILE.role, "text-3xl font-georama")}
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