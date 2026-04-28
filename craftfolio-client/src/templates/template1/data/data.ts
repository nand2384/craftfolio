export const links = {
  github: {
    url: "https://github.com/username",
    placeholder: "github.com/username",
    icon: "Github"
  },
  linkedin: { 
    url: "https://www.linkedin.com/in/username", 
    placeholder: "linkedin.com/in/username",
    icon: "Linkedin"
  },
  mail: {
    url: "user@domain.com",
    placeholder: "user@domain.com",
    icon: "Mail"
  },
  resume: {
    url: "Username_Resume",
    placeholder: "View Resume",
    icon: "FileText"
  }
};

export const data = {
  profile: {
    name: "Nand Patel",
    logoText: "NP.",
    jobTitle: "Full-Stack Web Developer",
  },
  sections: {
    navigation: true,
    hero: true,
    about: true,
    skills: true,
    projects: true,
    contact: true,
    footer: true,
  },
  navigation: {
    items: [
      { name: "Profile", id: "profile", icon: "User", toggle: false },
      { name: "Home", id: "hero", icon: "User", toggle: true },
      { name: "About", id: "about", icon: "FileText", toggle: true },
      { name: "Skills", id: "skills", icon: "Zap", toggle: true },
      { name: "Projects", id: "projects", icon: "Briefcase", toggle: true },
      { name: "Contact", id: "contact", icon: "Mail", toggle: true },
    ],
  },
  hero: {
    description: "I build fast, scalable web applications using modern technologies like React, Node.js, and PostgreSQL.",
    actions: {
      primary: { label: "View Projects", sectionId: "projects" },
      secondary: { label: "Contact Me", sectionId: "contact" },
    },
    socialLinks: ["github", "linkedin", "mail"]
  },
  about: {
    title: "About Me",
    description: "I am a full-stack web developer passionate about building fast, scalable, and user-focused web applications. I enjoy working across the entire stack — from designing intuitive frontend interfaces to developing efficient backend systems and APIs.",
    returnText: "Fast, Scalable, & User-Focused",
    stats: [
      { name: "Projects Built", value: "5+" },
      { name: "Technologies Used", value: "15+" },
      { name: "Github Repositories", value: "10+" }
    ],
    highlights: [
      "Full-stack web development",
      "REST API development",
      "Scalable backend architecture",
      "Modern frontend development with React",
      "Database design with PostgreSQL"
    ],
  },
  skills: {
    items: [
      { name: "React", icon: "Layers" },
      { name: "JavaScript", icon: "FileCode" },
      { name: "TypeScript", icon: "FileCode2" },
      { name: "Redux", icon: "Workflow" },
      { name: "Node.js", icon: "Terminal" },
      { name: "Express", icon: "Server" },
      { name: "REST APIs", icon: "Network" },
      { name: "JWT Auth", icon: "KeyRound" },
      { name: "Postman", icon: "SendHorizontal" },
      { name: "PostgreSQL", icon: "Database" },
      { name: "Supabase", icon: "Cloud" },
      { name: "Firebase", icon: "CloudLightning" },
      { name: "Tailwind CSS", icon: "Layout" },
      { name: "Git", icon: "GitBranch" },
      { name: "GitHub", icon: "Github" }
    ],
    categories: [
      {
        title: "Frontend Development",
        description: "Building responsive and performant user interfaces using modern frameworks, state management, and component-driven architecture.",
        icon: "Monitor",
        tech: "React, JavaScript, TypeScript, Redux, Tailwind CSS"
      },
      {
        title: "Backend Development",
        description: "Developing scalable backend services and REST APIs with secure authentication and efficient database integration.",
        icon: "Server",
        tech: "Node.js, Express, REST APIs, JWT Authentication, PostgreSQL, Supabase, Firebase"
      },
      {
        title: "Tools & Workflow",
        description: "Tools used for version control, API testing, and maintaining an efficient development workflow.",
        icon: "Wrench",
        tech: "Git, GitHub, Postman"
      }
    ]
  },
  projects: {
    title: "Featured Projects",
    description: "A selection of projects that showcase my experience building modern web applications.",
    items: [
      {
        title: "RapidX – Logistics & Delivery Platform",
        description: "A logistics and delivery management platform designed to streamline courier operations and track shipments efficiently.",
        features: [
          "Shipment tracking and order management",
          "User authentication and role-based access",
          "API-driven backend for logistics operations",
        ],
        image: "/projects/rapidx.png",
        technologies: ["React", "Node.js", "Express", "PostgreSQL", "Supabase"],
        github: "https://github.com/nand2384/RapidX",
        live: false,
        liveUrl: "#",
      },
      {
        title: "BloodNation – Blood Bank Management System",
        description: "A full-stack blood bank management platform that helps manage blood inventory, donor records, and requests efficiently.",
        features: [
          "Manage blood stock and donor records",
          "Secure authentication system",
          "Admin dashboard for managing blood inventory",
        ],
        image: "/projects/bloodnation.png",
        technologies: ["React", "Node.js", "Express", "PostgreSQL", "JWT Auth", "Tailwind CSS"],
        github: "https://github.com/nand2384/bloodnation",
        live: false,
        liveUrl: "#",
      },
      {
        title: "QuizWave – Online Quiz Platform",
        description: "An interactive quiz platform where users can take quizzes, view results, and track their performance through a leaderboard.",
        features: [
          "Dynamic quiz creation and management",
          "Real-time score tracking and leaderboard",
          "User authentication and result history",
        ],
        image: "/projects/quizwave.png",
        technologies: ["React", "Redux", "Node.js", "Express", "PostgreSQL"],
        github: "https://github.com/nand2384/quizwave",
        live: false,
        liveUrl: "#",
      },
      {
        title: "TaskFlow – Todo Management App",
        description: "A simple and efficient task management application that allows users to create, update, and organize daily tasks.",
        features: [
          "Add, edit, and delete tasks",
          "Task completion tracking",
          "Responsive UI with modern React components",
        ],
        image: "/projects/todos.png",
        technologies: ["React", "JavaScript", "Firebase", "Tailwind CSS"],
        github: "https://github.com/nand2384/Todos",
        live: true,
        liveUrl: "https://nand2384.github.io/Todos/login",
      },
    ]
  },
  contact: {
    title: "Get In Touch",
    description: "Have a project in mind or just want to say hi? Feel free to reach out!",
    info: [
      { icon: "Mail", title: "Email", value: "user@domain.com", linkKey: "mail" },
      { icon: "Linkedin", title: "LinkedIn", value: "linkedin.com/in/username", linkKey: "linkedin" },
      { icon: "Github", title: "GitHub", value: "github.com/username", linkKey: "github" },
      { icon: "MapPin", title: "Location", value: "City, Country", linkKey: null },
    ]
  },
  footer: {
    description: "Let's build something great together.",
    links: [
      { label: "GitHub", icon: "Github", linkKey: "github" },
      { label: "LinkedIn", icon: "Linkedin", linkKey: "linkedin" },
      { label: "Email", icon: "Mail", linkKey: "mail" },
      { label: "Resume", icon: "FileText", linkKey: "resume" }
    ]
  },
  theme: {
    highlight: "#4CAF7D",
    highlightDark: "#2E7D32",
    pageBg: "#FDFBF6",
    sectionBg: "#FFFFFF",
    textMain: "#1A1A1A",
    textMuted: "#666666",
    softAccentBg: "#E8F5E9"
  }
};