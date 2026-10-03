export interface Profile {
  name: string;
  firstName: string;
  role: string;
  subRole: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  shortBio: string;
  github: string;
  linkedin: string;
  portfolio: string;
  resumePdf: string;
  quote: string;
  dept: string;
  idNo: string;
  validTill: string;
  degree: string;
  institution: string;
  cgpa: string;
  currentRole: string;
  languages: { name: string; level: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  index: string;
}

export interface SkillElement {
  number: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'AI & Data' | 'Tools & Deployment';
  isBrand: boolean;
  logoKey: string;
  projects: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  live?: string;
  uiType: 'stadium' | 'adaptiq' | 'sentinel' | 'portfolio' | 'coldchain';
}

export interface Certification {
  index: string;
  title: string;
  issuer: string;
  dateOrYear: string;
  certificateUrl?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  place: string;
  detail: string;
  type: 'work' | 'education' | 'leadership';
}

export interface Achievement {
  id: string;
  index: string;
  label: string;
  title: string;
  detail: string;
  stat: number;
  statPrefix: string;
  statSuffix: string;
  caption: string;
  badge: string;
}

export const PROFILE: Profile = {
  name: "PRIYAN I",
  firstName: "PRIYAN",
  role: "Software Developer",
  subRole: "Software Engineer | Software Developer",
  email: "priyaniyappan120@gmail.com",
  phone: "8124939336",
  phoneHref: "tel:+918124939336",
  location: "India",
  resumeSummary:
    "AI & Data Science undergraduate with hands-on experience in software engineering, full stack development, backend engineering, AI-powered applications, and data analytics. Skilled in React, Next.js, Node.js, Express.js, Python, FastAPI, MongoDB, PostgreSQL, SQL, REST APIs, JWT authentication, Git, GitHub, and cloud deployment. Experienced in building and shipping end-to-end products through internships, hackathons, and independent projects.",
  shortBio:
    "AI & Data Science undergraduate specialized in building and shipping end-to-end full stack web applications, backend architectures, and AI-powered systems.",
  github: "https://github.com/Priyan120-dev",
  linkedin: "https://www.linkedin.com/in/priyan-i-179a7038b/",
  portfolio: "https://priyan-portfolio-sand.vercel.app",
  resumePdf: "/resume.pdf",
  quote:
    "Building and shipping end-to-end products with precision, resilient backend services, and interactive user experiences.",
  dept: "Artificial Intelligence & Data Science",
  idNo: "DSU-2025-AI",
  validTill: "2029",
  degree: "B.Tech, Artificial Intelligence & Data Science",
  institution: "Dhanalakshmi Srinivasan University, Tiruchirappalli",
  cgpa: "8.29 / 10.0",
  currentRole: "Full Stack Developer Intern · Innovation Hacks",
  languages: [
    { name: "English", level: "Intermediate (B1)" },
    { name: "Tamil", level: "Native" },
  ],
};

export const NAV: NavItem[] = [
  { label: "About", href: "#about", index: "01" },
  { label: "Skills", href: "#skills", index: "02" },
  { label: "Work", href: "#work", index: "03" },
  { label: "Certifications", href: "#certifications", index: "04" },
  { label: "Experience", href: "#experience", index: "05" },
  { label: "Achievements", href: "#achievements", index: "06" },
  { label: "Contact", href: "#contact", index: "07" },
];

export const SKILL_FAMILIES = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "AI & Data",
  "Tools & Deployment",
] as const;

export const SKILL_GROUPS: SkillElement[] = [
  // Languages
  { number: 1, symbol: "Py", name: "Python", family: "Languages", isBrand: true, logoKey: "python", projects: ["SENTINEL", "Data Analytics", "AI Models"] },
  { number: 2, symbol: "Js", name: "JavaScript", family: "Languages", isBrand: true, logoKey: "javascript", projects: ["Stadium OS", "Innovation Hacks", "Priyan Portfolio"] },
  { number: 3, symbol: "Ts", name: "TypeScript", family: "Languages", isBrand: true, logoKey: "typescript", projects: ["Stadium OS", "Portfolio Architecture"] },
  { number: 4, symbol: "Sq", name: "SQL", family: "Languages", isBrand: true, logoKey: "sql", projects: ["SENTINEL", "Oasis Infobyte Analytics"] },
  { number: 5, symbol: "Cp", name: "C++", family: "Languages", isBrand: true, logoKey: "cplusplus", projects: ["Algorithms & Problem Solving"] },

  // Frontend
  { number: 6, symbol: "Re", name: "React.js", family: "Frontend", isBrand: true, logoKey: "react", projects: ["Stadium OS", "AdaptIQ", "Innovation Hacks"] },
  { number: 7, symbol: "Nx", name: "Next.js", family: "Frontend", isBrand: true, logoKey: "nextjs", projects: ["Stadium OS", "Priyan Portfolio"] },
  { number: 8, symbol: "H5", name: "HTML5", family: "Frontend", isBrand: true, logoKey: "html5", projects: ["Full Stack Applications"] },
  { number: 9, symbol: "C3", name: "CSS3", family: "Frontend", isBrand: true, logoKey: "css3", projects: ["Responsive Interfaces", "Design Systems"] },
  { number: 10, symbol: "Tw", name: "Tailwind CSS", family: "Frontend", isBrand: true, logoKey: "tailwindcss", projects: ["Stadium OS", "AdaptIQ", "Priyan Portfolio"] },
  { number: 11, symbol: "Fm", name: "Framer Motion", family: "Frontend", isBrand: true, logoKey: "framermotion", projects: ["Priyan Portfolio", "Interactive UI"] },
  { number: 12, symbol: "Th", name: "Three.js", family: "Frontend", isBrand: true, logoKey: "threejs", projects: ["Priyan Portfolio", "3D Web Environments"] },

  // Backend
  { number: 13, symbol: "Nd", name: "Node.js", family: "Backend", isBrand: true, logoKey: "nodejs", projects: ["Innovation Hacks", "Full Stack Services"] },
  { number: 14, symbol: "Ex", name: "Express.js", family: "Backend", isBrand: true, logoKey: "express", projects: ["Innovation Hacks", "REST Services"] },
  { number: 15, symbol: "Fa", name: "FastAPI", family: "Backend", isBrand: true, logoKey: "fastapi", projects: ["SENTINEL Alert Platform"] },
  { number: 16, symbol: "Ra", name: "REST APIs", family: "Backend", isBrand: false, logoKey: "restapi", projects: ["Stadium OS", "SENTINEL", "Innovation Hacks"] },
  { number: 17, symbol: "Jw", name: "JWT Auth", family: "Backend", isBrand: false, logoKey: "jwt", projects: ["Innovation Hacks", "Secure Services"] },

  // Databases
  { number: 18, symbol: "Mg", name: "MongoDB", family: "Databases", isBrand: true, logoKey: "mongodb", projects: ["Innovation Hacks", "Web Application Backends"] },
  { number: 19, symbol: "Pg", name: "PostgreSQL", family: "Databases", isBrand: true, logoKey: "postgresql", projects: ["Relational Data Pipelines"] },
  { number: 20, symbol: "Sl", name: "SQLite", family: "Databases", isBrand: true, logoKey: "sqlite", projects: ["SENTINEL Platform"] },
  { number: 21, symbol: "Fb", name: "Firebase", family: "Databases", isBrand: true, logoKey: "firebase", projects: ["Realtime Sync & Cloud Storage"] },
  { number: 22, symbol: "Sb", name: "Supabase", family: "Databases", isBrand: true, logoKey: "supabase", projects: ["Postgres Backend Services"] },

  // AI & Data
  { number: 23, symbol: "Ga", name: "Generative AI", family: "AI & Data", isBrand: false, logoKey: "genai", projects: ["AdaptIQ", "Innovation Hacks AI Tools"] },
  { number: 24, symbol: "Ml", name: "Machine Learning", family: "AI & Data", isBrand: false, logoKey: "ml", projects: ["Predictive Analytics", "Hackathon Models"] },
  { number: 25, symbol: "Da", name: "Data Analysis", family: "AI & Data", isBrand: false, logoKey: "dataanalysis", projects: ["Oasis Infobyte Internship"] },
  { number: 26, symbol: "Dv", name: "Data Visualization", family: "AI & Data", isBrand: false, logoKey: "dataviz", projects: ["Oasis Infobyte", "Analytics Dashboards"] },
  { number: 27, symbol: "Gm", name: "Gemini API", family: "AI & Data", isBrand: true, logoKey: "gemini", projects: ["AdaptIQ Learning System"] },

  // Tools & Deployment
  { number: 28, symbol: "Gt", name: "Git", family: "Tools & Deployment", isBrand: true, logoKey: "git", projects: ["All Projects & Version Control"] },
  { number: 29, symbol: "Gh", name: "GitHub", family: "Tools & Deployment", isBrand: true, logoKey: "github", projects: ["Open Source Repositories"] },
  { number: 30, symbol: "Vc", name: "Vercel", family: "Tools & Deployment", isBrand: true, logoKey: "vercel", projects: ["Next.js Production Deployments"] },
  { number: 31, symbol: "Rd", name: "Render", family: "Tools & Deployment", isBrand: true, logoKey: "render", projects: ["Stadium OS Live Deployment"] },
  { number: 32, symbol: "Nf", name: "Netlify", family: "Tools & Deployment", isBrand: true, logoKey: "netlify", projects: ["Frontend Hosting & CI/CD"] },
];

export const PROJECTS: Project[] = [
  {
    id: "stadium-os",
    index: "01",
    title: "Stadium OS",
    kicker: "AI Multi-Agent Operations",
    description:
      "Built a real-time stadium operations simulation with specialized agents for emergency response, navigation, crowd intelligence, volunteer dispatch, accessibility, and multilingual communication.",
    features: [
      "Event-bus architecture & cross-tab synchronization",
      "Dijkstra shortest-path routing algorithm for rapid emergency response",
      "Role-based mission-control workflows with human approval gates",
      "Live crowd intelligence simulation across stadium zones",
    ],
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Dijkstra"],
    github: "https://github.com/Priyan120-dev/Stadium-os-2026",
    live: "https://stadium-os-2026-1.onrender.com",
    uiType: "stadium",
  },
  {
    id: "adaptiq",
    index: "02",
    title: "AdaptIQ",
    kicker: "AI Adaptive Learning Platform",
    description:
      "Designed an AI-powered adaptive learning platform that personalizes study content and learning support for B.Tech students. Developed as the 1st Prize project at AI Impact for ALL 2026 — National Technology Day Hackathon.",
    features: [
      "1st Prize winner at AI Impact for ALL 2026 Hackathon",
      "Personalized adaptive curriculum paths for engineering students",
      "Generative AI-assisted study support and topic summarization",
      "Dynamic knowledge evaluation and contextual retention tracking",
    ],
    tech: ["React", "Generative AI", "Gemini API", "Tailwind CSS"],
    github: "https://github.com/Priyan707/AdaptIQ-AI-Learning-Platform",
    uiType: "adaptiq",
  },
  {
    id: "sentinel",
    index: "03",
    title: "SENTINEL",
    kicker: "Intelligent Monitoring Platform",
    description:
      "Built a backend-focused monitoring platform with API-driven architecture, persistent data storage, and alert-oriented workflows. Structured maintainable backend services and database access patterns.",
    features: [
      "Asynchronous FastAPI microservice architecture",
      "SQLAlchemy relational persistence with SQLite backend",
      "Configurable threshold alert triggers & status pipelines",
      "Clean service-layer isolation and testable database repositories",
    ],
    tech: ["FastAPI", "Python", "SQLAlchemy", "SQLite"],
    github: "https://github.com/Priyan120-dev/SENTINEL",
    uiType: "sentinel",
  },
  {
    id: "priyan-portfolio",
    index: "04",
    title: "Priyan Portfolio",
    kicker: "Interactive 3D Portfolio",
    description:
      "Created a responsive developer portfolio using 3D environments, interactive project showcases, motion design, and performance-conscious frontend architecture.",
    features: [
      "Three.js & React Three Fiber dynamic spatial viewports",
      "Smooth scene orchestrations and fluid interaction dynamics",
      "Performance-tuned asset pipeline with zero layout shifts",
      "Cross-device responsiveness from mobile screens to 4K displays",
    ],
    tech: ["Next.js", "React", "Three.js", "React Three Fiber", "GSAP"],
    github: "https://github.com/Priyan120-dev/Priyan-Portfolio",
    live: "https://priyan-portfolio-sand.vercel.app",
    uiType: "portfolio",
  },
  {
    id: "cold-chain",
    index: "05",
    title: "Vaccine Cold Chain Box",
    kicker: "IoT Healthcare Monitoring",
    description:
      "Built a temperature monitoring solution for vaccine cold-chain conditions with threshold alerts and real-time monitoring; won 3rd Prize at Synergia 0.1 National Level Hackathon.",
    features: [
      "3rd Prize at Synergia 0.1 National Level Hackathon",
      "High-precision DS18B20 digital thermal sensor integration",
      "ESP32 microcontroller with Wi-Fi telemetry broadcasting",
      "Blynk IoT cloud dashboard with immediate breach notifications",
    ],
    tech: ["IoT", "ESP32", "DS18B20", "Blynk"],
    github: "https://github.com/Priyan120-dev",
    uiType: "coldchain",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    index: "01",
    title: "Basics of Business Intelligence: Technologies & Applications",
    issuer: "UniAthena in partnership with Cambridge International Qualifications, UK",
    dateOrYear: "26 Sep 2026",
    certificateUrl: "/certificates/uniathena-business-intelligence.jpeg",
  },
  {
    index: "02",
    title: "Full Stack Development Internship",
    issuer: "Innovation Hacks · Intern ID: IH-FS-2026-0056",
    dateOrYear: "Aug – Sep 2026",
    certificateUrl: "/certificates/full-stack-development-internship.jpeg",
  },
  {
    index: "03",
    title: "Quantum AI Domain Winner — QUANT-A-THON 2026",
    issuer: "Rajalakshmi Institute of Technology & National Hub for Quantum Communication",
    dateOrYear: "Winner · 2026",
    certificateUrl: "/certificates/quantum-ai-domain-winner.jpeg",
  },
  {
    index: "04",
    title: "PromptWars Virtual — Certificate of Achievement",
    issuer: "Google for Developers / Build with AI / H2S · Top 400 Leaderboard",
    dateOrYear: "25 Aug 2026",
    certificateUrl: "/certificates/google-promptwars-virtual-achievement.jpeg",
  },
  {
    index: "05",
    title: "IDEAVENTURE Startup Pitch — 3rd Position",
    issuer: "Cyber Club, Department of Cyber Security, SET-DSU",
    dateOrYear: "30 Jan 2026",
    certificateUrl: "/certificates/dsu-ideaventure-startup-pitch.jpeg",
  },
  {
    index: "06",
    title: "MEDXPERIA_2K26 Hackathon — 3rd Place",
    issuer: "Department of Biomedical Engineering, PSNA College of Engineering & Technology",
    dateOrYear: "16 Apr 2026",
    certificateUrl: "/certificates/medxperia-2k26-hackathon.jpeg",
  },
  {
    index: "07",
    title: "Smart Logistics Node for Vaccine Safety Monitoring — 3rd Prize",
    issuer: "Dept. of CSE (IoT), School of Engineering & Technology, DSU · Synergia",
    dateOrYear: "10 Mar 2026",
    certificateUrl: "/certificates/synergia-smart-logistics-node.jpeg",
  },
  {
    index: "08",
    title: "Product Understanding — Google Student Ambassador Program",
    issuer: "Google Student Ambassador Program 2026 at Dhanalakshmi Srinivasan University",
    dateOrYear: "28 Aug 2026",
    certificateUrl: "/certificates/google-student-ambassador-product-understanding.jpeg",
  },
  {
    index: "09",
    title: "AI Tools and ChatGPT Workshop",
    issuer: "be10x",
    dateOrYear: "22 Mar 2026",
    certificateUrl: "/certificates/be10x-ai-tools-chatgpt-workshop.jpeg",
  },
  {
    index: "10",
    title: "Self-presentation Microcertificate",
    issuer: "Wadhwani Foundation",
    dateOrYear: "09 Feb 2026",
    certificateUrl: "/certificates/wadhwani-self-presentation.jpeg",
  },
  {
    index: "11",
    title: "Online Quiz on MY Bharat Budget Quest 2026",
    issuer: "Ministry of Youth Affairs & Sports · MYBharat",
    dateOrYear: "12 Feb 2026",
    certificateUrl: "/certificates/my-bharat-budget-quest.jpeg",
  },
  {
    index: "12",
    title: "Nexus AI Quiz Ignite 2026",
    issuer: "Nexus · Official Partner InterviewBuddy",
    dateOrYear: "2026",
    certificateUrl: "/certificates/nexus-ai-quiz-ignite-2026.jpeg",
  },
  {
    index: "13",
    title: "Hack Fusion 2026",
    issuer: "Chennai Institute of Technology (CIT)",
    dateOrYear: "2026",
    certificateUrl: "/certificates/hack-fusion-2026-cit.jpeg",
  },
  {
    index: "14",
    title: "Attacking the MCP: Breaking the Agents",
    issuer: "DEF CON Group (DCG 91422) Coimbatore",
    dateOrYear: "05 Sep 2026",
    certificateUrl: "/certificates/dcg-coimbatore-mcp-breaking-agents.jpeg",
  },
  {
    index: "15",
    title: "National Technology Day Hackathon on AI Impact for all 2026",
    issuer: "Department of MCA, School of Engineering & Technology, DSU",
    dateOrYear: "11 May 2026",
    certificateUrl: "/certificates/ai-impact-for-all-hackathon.jpeg",
  },
  {
    index: "16",
    title: "Gen AI Hackathon — FIESTAA'26",
    issuer: "KPR Institute of Engineering and Technology, Coimbatore",
    dateOrYear: "20 & 21 Feb 2026",
    certificateUrl: "/certificates/fiestaa26-genai-hackathon.jpeg",
  },
  {
    index: "17",
    title: "Mi - Paper Presentation — FIESTAA'26",
    issuer: "KPR Institute of Engineering and Technology, Coimbatore",
    dateOrYear: "20 & 21 Feb 2026",
    certificateUrl: "/certificates/fiestaa26-mi-paper-presentation.jpeg",
  },
  {
    index: "18",
    title: "Cb - Paper Presentation — FIESTAA'26",
    issuer: "KPR Institute of Engineering and Technology, Coimbatore",
    dateOrYear: "20 & 21 Feb 2026",
    certificateUrl: "/certificates/fiestaa26-cb-paper-presentation.jpeg",
  },
  {
    index: "19",
    title: "NEXUS'26 National Level Hackathon",
    issuer: "CyberClub, Department of Cyber Security, SET-DSU",
    dateOrYear: "11 Feb 2026",
    certificateUrl: "/certificates/nexus26-national-hackathon.jpeg",
  },
  {
    index: "20",
    title: "Mathematical Modelling Jam",
    issuer: "Department of Mathematics, School of Engineering & Technology, DSU",
    dateOrYear: "24 Sep 2025",
    certificateUrl: "/certificates/mathematical-modelling-jam.jpeg",
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2026",
    title: "Full Stack Developer Intern",
    place: "Innovation Hacks · 1 Month",
    detail:
      "Developed and refined full stack web application features using React, Node.js, Express.js, MongoDB, and REST APIs. Implemented frontend interfaces, backend services, authentication flows, and API integration using modular development practices. Built and documented an internship project with AI-assisted productivity features.",
    type: "work",
  },
  {
    year: "Jul 2026",
    title: "Data Analytics Intern",
    place: "Oasis Infobyte",
    detail:
      "Performed data preprocessing, exploratory analysis, visualization, and dataset organization using Python and analytics tools. Worked with Excel and SQL-based analysis to identify patterns and communicate data-driven insights.",
    type: "work",
  },
  {
    year: "2026 Spring",
    title: "Campus Ambassador",
    place: "Reskilll · Spring Cohort",
    detail:
      "Selected as a Reskilll Campus Ambassador for the 2026 Spring Cohort, supporting student engagement around technology programs, hackathons, and developer initiatives.",
    type: "leadership",
  },
  {
    year: "2025 — 2029",
    title: "B.Tech in Artificial Intelligence & Data Science",
    place: "Dhanalakshmi Srinivasan University, Tiruchirappalli",
    detail:
      "Undergraduate coursework covering software engineering, algorithms, AI architectures, database systems, and statistical computation. Current academic record: CGPA 8.29 / 10.0.",
    type: "education",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "quantathon",
    index: "01 / 06",
    label: "International Hackathon",
    title: "Quantathon Winner",
    detail: "Domain Winner; ₹50,000 cash prize in international technical competition.",
    stat: 50000,
    statPrefix: "₹",
    statSuffix: "",
    caption: "Cash Prize Awarded",
    badge: "Domain Winner",
  },
  {
    id: "ai-impact",
    index: "02 / 06",
    label: "National Technology Day Hackathon",
    title: "AI Impact for ALL 2026",
    detail: "1st Prize for AdaptIQ — AI Adaptive Learning Platform.",
    stat: 1,
    statPrefix: "",
    statSuffix: "st",
    caption: "First Prize Rank",
    badge: "1st Prize",
  },
  {
    id: "medxperia",
    index: "03 / 06",
    label: "National Level Technical Symposium",
    title: "MedXPeria Symposium",
    detail: "3rd Prize for Real-Time Blood Bank Inventory AI System.",
    stat: 3,
    statPrefix: "",
    statSuffix: "rd",
    caption: "Podium Finish",
    badge: "3rd Prize",
  },
  {
    id: "synergia",
    index: "04 / 06",
    label: "National Level Hackathon",
    title: "Synergia 0.1 Hackathon",
    detail: "3rd Prize for Vaccine Cold Chain Monitoring Box IoT system.",
    stat: 3,
    statPrefix: "",
    statSuffix: "rd",
    caption: "Podium Finish",
    badge: "3rd Prize",
  },
  {
    id: "ideaventure",
    index: "05 / 06",
    label: "Startup Pitch Competition",
    title: "IDEAVENTURE Startup Pitch",
    detail: "3rd Prize for innovative technology startup business presentation.",
    stat: 3,
    statPrefix: "",
    statSuffix: "rd",
    caption: "Podium Finish",
    badge: "3rd Prize",
  },
  {
    id: "promptwars",
    index: "06 / 06",
    label: "Google for Developers / H2S",
    title: "PromptWars Virtual",
    detail: "Top 400 Leaderboard in Challenge 4 competitive prompt engineering.",
    stat: 400,
    statPrefix: "Top ",
    statSuffix: "",
    caption: "Global Leaderboard Rank",
    badge: "Top 400",
  },
];
