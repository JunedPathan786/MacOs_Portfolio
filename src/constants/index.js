const navLinks = [
  {
    id: 1,
    name: "Projects",
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
    id: "about",
    name: "About",
    icon: "about.png",
    canOpen: true,
  },
  {
    id: "work",
    name: "Work",
    icon: "work.png",
    canOpen: true,
  },
  {
    id: "project-detail",
    name: "Project Detail",
    icon: "project-detail.png",
    canOpen: true,
  },
  {
    id: "resume",
    name: "Resume",
    icon: "resume.png",
    canOpen: true,
  },
  {
    id: "skills",
    name: "Skills",
    icon: "skills.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash.png",
    canOpen: true,
  },
  {
    id: "settings",
    name: "Settings",
    icon: "settings.png",
    canOpen: true,
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
    text: "Leetcode",
    icon: "/icons/leetcode.svg",
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
    id: "featured",
    icon: "/icons/featured.svg",
    title: "Featured",
  },
  {
    id: "experiments",
    icon: "/icons/experiments.svg",
    title: "Experiments",
  },
  {
    id: "ui-motion",
    icon: "/icons/ui-motion.svg",
    title: "UI & Motion",
  },
  {
    id: "journey",
    icon: "/icons/journey.svg",
    title: "Journey",
  },
  {
    id: "favorites",
    icon: "/icons/favorites.svg",
    title: "Favorites",
  },
];

const gallery = {
  featured: [
    {
      id: 1,
      type: "image",
      img: "/images/Dvetwon_Community.jpg",
      title: "Community recognition",
      size: "lg",
    },
    {
      id: 2,
      type: "image",
      img: "/images/SQL50+.gif",
      title: "LeetCode SQL 50 badge",
    },
    {
      id: 3,
      type: "image",
      img: "/images/50+.gif",
      title: "LeetCode 50+ problems badge",
    },
  ],
  experiments: [
    {
      id: 1,
      kind: "loader",
      title: "Boot loader sequence",
      description:
        "SVG path-drawing intro animation, sequenced with a GSAP timeline.",
    },
    {
      id: 2,
      kind: "search",
      title: "Command-K search overlay",
      description:
        "Custom fuzzy search across apps, files, and links with full keyboard navigation.",
    },
    {
      id: 3,
      kind: "dock",
      title: "Dock magnification",
      description:
        "Cursor-proximity icon scaling on the dock, driven by GSAP quickTo.",
    },
  ],
  "ui-motion": [
    {
      id: 1,
      kind: "drag",
      title: "Draggable windows",
      description:
        "GSAP Draggable with edge resistance, bounded to the desktop.",
    },
    {
      id: 2,
      kind: "window",
      title: "Window controls",
      description:
        "Close, minimize, and maximize, with motion anchored back to the dock.",
    },
    {
      id: 3,
      kind: "theme",
      title: "Theme transition",
      description: "Light/dark mode switching across the whole interface.",
    },
  ],
  journey: [
    {
      id: 1,
      period: "2021 – 2025",
      title: "B.E. in Computer Engineering",
      place: "PVGCOE, Nashik",
    },
    {
      id: 2,
      period: "Jan 2024 – Feb 2024",
      title: "Web Developer Intern",
      place: "CodSoft (Remote)",
    },
    {
      id: 3,
      period: "Sep 2025 – Nov 2025",
      title: "Web Developer Intern",
      place: "Infotact (Remote)",
    },
    {
      id: 4,
      period: "",
      title: "150+ DSA problems solved",
      place: "LeetCode",
      img: "/images/100+.gif",
    },
    {
      id: 5,
      period: "",
      title: "TCS iON Young Professional Certification",
      place: "TCS iON",
      img: "/images/Certificate.jpg",
    },
  ],
  favorites: [
    {
      id: 1,
      title: "React.js",
      note: "Primary frontend library across every project.",
    },
    {
      id: 2,
      title: "Node.js & Express.js",
      note: "Go-to backend pairing for REST APIs.",
    },
    {
      id: 3,
      title: "MongoDB",
      note: "Preferred database across the MERN stack.",
    },
    {
      id: 4,
      title: "TypeScript",
      note: "For safer, more maintainable JavaScript.",
    },
    {
      id: 5,
      title: "GSAP",
      note: "Animation engine behind this portfolio's motion.",
    },
    {
      id: 6,
      title: "Socket.IO",
      note: "For real-time, collaborative features.",
    },
  ],
};

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
          name: "Own_Software_Ai",
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
          name: "Scalable-URL-Shortener",
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
          name: "AI-Interview-Preparation-Platform",
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
    // ▶ Project 3
    {
      id: 7,
      name: "Wishing Lake 2.0",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Wishing Lake 2.0.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A full-stack social and crowdfunding platform built with the MERN stack where users can create wishes, discover wishes from others, and contribute toward fulfilling them.",
            "Implements user authentication, wish management, interactive user flows, payment functionality, and separate frontend and backend applications.",
            "Includes RESTful APIs, MongoDB data management, authentication flows, payment integration, and API testing through a dedicated Postman collection.",
            "The project evolved from the original Wishing Lake concept into a more structured full-stack application with dedicated testing documentation and production-oriented organization.",
            "Tech stack: MongoDB, Express.js, React.js, Node.js, JWT, REST APIs, payment integration, Postman.",
          ],
        },
        {
          id: 2,
          name: "Wishing-Lake-2.0",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/Wishing-Lake-2.0",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "wishing-lake.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
      ],
    },

    // ▶ Project 4
    {
      id: 8,
      name: "Niche E-Commerce Platform",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Niche E-Commerce Platform.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A full-stack niche marketplace designed to connect Indian artisans and handmade-product creators with customers through a dedicated e-commerce platform.",
            "Implements product management, customer and seller workflows, authentication, order management, payment functionality, and administrative operations.",
            "Includes separate frontend and backend applications with REST APIs and MongoDB-based data management.",
            "Designed around a marketplace model rather than a conventional single-vendor store, allowing the platform to support multiple product creators and different user workflows.",
            "Tech stack: MongoDB, Express.js, React.js, Node.js, JWT, REST APIs, payment integration.",
          ],
        },
        {
          id: 2,
          name: "Niche-E-Commerce-Platform",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/Niche-E-Commerce-Platform",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "niche-ecommerce.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-4.png",
        },
      ],
    },

    // ▶ Project 5
    {
      id: 9,
      name: "Urban Company Clone",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Urban Company Clone.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A MERN-based hyperlocal service marketplace developed during my internship at Infotact Solutions to connect customers with local service professionals.",
            "Supports service discovery, user authentication, service-provider workflows, booking-related functionality, and RESTful backend APIs.",
            "Implemented JWT authentication, MongoDB data management, Razorpay payment integration, and modular Express.js backend development.",
            "Worked as Team Lead and Backend Developer, contributing to backend architecture, API development, database integration, and coordination between frontend and backend development.",
            "Tech stack: MongoDB, Express.js, React.js, Node.js, JWT, Razorpay, REST APIs.",
          ],
        },
        {
          id: 2,
          name: "Hyperlocal-Service-Backend",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/Hyperlocal-Service-Backend",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "urban-company.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-5.png",
        },
      ],
    },

    // ▶ Project 6
    {
      id: 10,
      name: "Zomato + Reels",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Zomato + Reels.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A full-stack food discovery and ordering platform combining restaurant discovery and food ordering with short-form video content.",
            "Users can explore food-related content, discover restaurants, interact with food experiences, and use the platform's ordering-oriented functionality.",
            "Built with separate frontend and backend applications and designed around RESTful APIs and MongoDB data management.",
            "The project explores the combination of social-media-style content discovery with a food-ordering experience instead of building a conventional food-delivery clone.",
            "Tech stack: React.js, Node.js, Express.js, MongoDB, REST APIs, JavaScript.",
          ],
        },
        {
          id: 2,
          name: "Zomato-Reel-application",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/Zomato-Reel-application",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "zomato-reels.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-6.png",
        },
      ],
    },

    // ▶ Project 7
    {
      id: 11,
      name: "Voltara Technologies",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Voltara Technologies.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A production-oriented business website built with Next.js and React for presenting company services, projects, information, and contact experiences.",
            "Implements dedicated contact and newsletter API routes with Resend integration for transactional email workflows.",
            "Uses a structured application architecture with reusable components, features, data, constants, and utility modules to keep the codebase maintainable.",
            "Includes responsive layouts, dynamic content, loading states, service and project sections, contact functionality, and Google Maps integration.",
            "Tech stack: Next.js 16, React 19, JavaScript, Resend, Vercel, API Routes.",
          ],
        },
        {
          id: 2,
          name: "voltaratechnology",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/voltaratechnology",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "voltara-technologies.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-7.png",
        },
      ],
    },

    // ▶ Project 8
    {
      id: 12,
      name: "Interactive macOS Portfolio",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Interactive macOS Portfolio.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "An interactive developer portfolio designed as a macOS-inspired desktop environment instead of a conventional portfolio website.",
            "Features a desktop interface with Finder-style windows, Dock navigation, menu bar interactions, project folders, About, Skills, Resume, Contact, Settings, and Trash.",
            "Built to demonstrate frontend engineering, interaction design, reusable UI components, responsive behavior, window management, and micro-interactions.",
            "The portfolio treats personal information and projects as an interactive operating-system-style experience, making the website itself part of the portfolio.",
            "Tech stack: React.js, Vite, JavaScript, CSS, Tailwind CSS, responsive UI, interactive window management.",
          ],
        },
        {
          id: 2,
          name: "MacOs_Portfolio",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/MacOs_Portfolio",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "macos-portfolio.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-8.png",
        },
      ],
    },

    // ▶ Project 9
    {
      id: 13,
      name: "Backend Video Platform",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Backend Video Platform.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A backend-focused video-sharing platform inspired by modern video hosting applications and built to practice scalable REST API development.",
            "Implements user authentication, video management, likes, dislikes, comments, replies, subscriptions, and other social interactions.",
            "Uses MongoDB and Mongoose for data modeling with JWT authentication and bcrypt-based password security.",
            "The project focuses on backend architecture, database relationships, authentication flows, API design, and implementing social features around video content.",
            "Tech stack: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, REST APIs.",
          ],
        },
        {
          id: 2,
          name: "Backend",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/Backend",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "backend-video-platform.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-9.png",
        },
      ],
    },

    // ▶ Project 10
    {
      id: 14,
      name: "3D DogStudio Experience",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "3D DogStudio Experience.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A creative 3D web experience inspired by modern digital-agency websites and designed to explore immersive browser-based interactions.",
            "Uses Three.js to create interactive 3D elements and combines them with a React-based application structure.",
            "Focuses on creative frontend development, 3D rendering, interactive visual experiences, and modern web presentation.",
            "The project demonstrates the ability to move beyond conventional layouts and experiment with WebGL-powered interfaces.",
            "Tech stack: React.js, Three.js, Vite, JavaScript, WebGL.",
          ],
        },
        {
          id: 2,
          name: "3D-DogStudio-Project",
          icon: "/icons/github.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/JunedPathan786/3D-DogStudio-Project",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "3d-dogstudio.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-10.png",
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
