const navLinks = [
  {
    id: 1,
    name: "Portfolio",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const PROFILE = {
  name: "Juned Pathan",
  role: "Full-Stack Developer",
  location: "Maharashtra, India",
  email: "junedp068@gamil.com",
  avatar: "/images/juned.png",
  summary:
    "Full-stack developer focused on scalable MERN applications, AI-powered products, clean interfaces, and production-minded backend architecture.",
  availability: "Open to freelance and full-time opportunities",
};

const navIcons = [
  {
    id: 1,
    img: "/icons/battery.svg",
    type: "battery",
  },
  {
    id: 2,
    img: "/icons/search.svg",
    type: "search",
  },
  {
    id: 3,
    img: "/icons/wifi.svg",
    type: "wifi",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
    type: "mode",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Finder",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Safari",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Photos",
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
    name: "Terminal",
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

const techStack = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C", "C++", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Redux Toolkit", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "JWT Auth"],
  },
  {
    category: "Cloud / DevOps",
    items: ["Docker", "AWS EC2", "AWS ECS", "AWS ECR", "AWS IAM", "AWS VPC"],
  },
  {
    category: "Database",
    items: ["MongoDB", "MySQL"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "Cloudinary", "VS Code", "Cursor IDE"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/JunedPathan786",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://leetcode.com/u/juned_pathan/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/home",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/junedpathan/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
  PROFILE,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Devin-AI Platform",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Devin-AI Platform.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Devin-AI Platform is a full-stack AI developer platform built with MongoDB, Express.js, React.js, Node.js, and Socket.IO.",
            "Designed for real-time collaboration, it integrates the Google Gemini API and JWT-based authentication, improving collaboration efficiency through real-time synchronization.",
            "Implements client-server communication and dynamic file system management, reducing session handling overhead by 38% and increasing real-time interaction performance by 32%.",
            "Tech stack: MongoDB, Express.js, React.js, Node.js, Socket.IO, JWT, Google Gemini API, Tailwind CSS.",
          ],
        },
        {
          id: 2,
          name: "github.com/JunedPathan786/Own_Software_Ai",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/Own_Software_Ai",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "devin-ai-platform.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "Scalable URL Shortener",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "Scalable URL Shortener.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A production-ready URL shortener built with React.js, Vite, Node.js, Express.js, and MongoDB, using a modular architecture (routes, controllers, services, and DAO).",
            "Features JWT authentication, MVC architecture, custom aliases, and click analytics with secure REST APIs, reducing code complexity by 60%.",
            "Enhanced URL resolution by integrating Redis caching and MongoDB indexing, improving lookup latency by up to 70%, with a scalable architecture supporting load balancing, horizontal scaling, and CDN-ready deployment.",
            "Tech stack: React.js, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, Redis, JWT, React Query, React Router, NanoID.",
          ],
        },
        {
          id: 2,
          name: "github.com/JunedPathan786/Scalable-URL-Shortener",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/Scalable-URL-Shortener",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "scalable-url-shortener.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "AI Interview Preparation Platform",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "AI Interview Preparation Platform.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "An AI-powered interview preparation platform built with React.js, Node.js, Express.js, and MongoDB.",
            "Analyzes resumes and job descriptions to generate structured interview reports, skill-gap analysis, and technical and behavioral questions, achieving 95%+ schema-valid AI responses using Gemini and Zod.",
            "Includes secure JWT authentication with token blacklisting, PDF resume parsing, and AI-generated ATS-friendly resume export using Puppeteer, reducing manual interview preparation time by 70%.",
            "Tech stack: React.js, Node.js, Express.js, MongoDB, Google Gemini 2.5 Flash, Zod, Puppeteer, JWT, SCSS.",
          ],
        },
        {
          id: 2,
          name: "github.com/JunedPathan786/AI-Interview-Preparation-Platform",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/AI-Interview-Preparation-Platform",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "ai-interview-prep.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "juned.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/juned.png",
    },
    {
      id: 2,
      name: "developer.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/juned-2.png",
    },
    {
      id: 3,
      name: "workspace.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/juned-3.png",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Software Engineer & Full-Stack Developer",
      image: "/images/juned.png",
      description: [
        "Hey! I’m Juned 👋, a software engineer specializing in MERN stack development and full-stack application engineering.",
        "I work primarily with JavaScript, TypeScript, React.js, Node.js, Express.js, and MongoDB, with hands-on experience building RESTful APIs, scalable applications, and AI-powered web platforms.",
        "I enjoy working on challenging products—from real-time developer platforms and scalable infrastructure to AI-powered interview and resume tools—with a strong focus on backend architecture, authentication, performance, and clean user experiences.",
        "I’ve gained professional experience through web development internships at CodSoft and Infotact, while continuously strengthening my foundation in DSA, OOP, DBMS, Operating Systems, and Computer Networks.",
        "Outside of building applications, I’m constantly experimenting with new technologies, solving DSA problems, and turning ideas into practical software.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
