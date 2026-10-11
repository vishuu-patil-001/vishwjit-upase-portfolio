
/**
 * Personal portfolio data for Vishwjit Upase.
 * Brand: V SERIES
 * Focus: Software Engineering × AI
 */

export type Palette = {
  from: string;
  via: string;
  to: string;
  accent: string;
};

export const profile = {
  fullName: 'Vishwjit Upase',
  displayName: 'Vishwjit Upase',
  firstName: 'VISHWJIT',
  seriesTag: 'V SERIES',
  originalLabel: 'VISHWJIT ORIGINAL',
  role: 'Software Development Engineer | AI & Generative AI',
  tagline: [
    'Software Engineering',
    'AI & Generative AI',
    'Full-Stack Development',
  ],
  intro:
    "I'm Vishwjit Upase, a B.E. Information Technology undergraduate graduating in 2027, focused on software engineering, full-stack development, and Generative AI. I build practical applications that combine reliable software architecture with intelligent workflows. My projects include TripMind AI, a multi-agent travel planner built with FastAPI and LangGraph, and AppliJobTrack, a full-stack job application tracker with authentication, application management, and analytics. I'm strengthening my foundations in data structures, algorithms, and core computer science while building toward Software Development Engineer and AI-focused opportunities.",
  location: 'Pune, Maharashtra, India',
  email: 'vishwjitupase2807@gmail.com',
  phone: '+91 9325496171',
  links: {
    linkedin: 'https://www.linkedin.com/in/mr-vishwjit-p-upase/',
    github: 'https://github.com/vishuu-patil-001',
  },
  resumePdf: '/assets/Vishwjit_Upase_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet:
      '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Vishwjit Upase',
  },
  interests: [
    'Software Engineering',
    'Full-Stack Development',
    'Generative AI',
    'AI Agents',
    'System Design',
  ],
};

export const education = [
  {
    school: "JSPM's Jayawantrao Sawant College of Engineering",
    place: 'Hadapsar, Pune, Maharashtra',
    degree: 'Bachelor of Engineering — Information Technology',
    period: 'August 2023 – June 2027',
    score: 'CGPA 8.0/10',
  },
  {
    school: 'Yeshwant Mahavidyalaya',
    place: 'Nanded, Maharashtra',
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2021 – 2023',
    score: '55.17%',
  },
  {
    school: 'Tiny Angels School',
    place: 'Nanded, Maharashtra',
    degree: 'Secondary School Certificate (SSC)',
    period: '2020 – 2021',
    score: '92.40%',
  },
];

export const experience = [
  {
    company: 'Cognifyz Technologies',
    role: 'Python Development Intern',
    place: 'Remote',
    period: 'December 2025 – January 2026',
    points: [
      'Completed task-based Python development assignments during the internship.',
      'Practised Python programming, problem-solving, debugging, and implementation.',
      'Worked through assigned technical tasks as part of the internship experience.',
    ],
  },
];

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  demo?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'tripmind-ai',
    title: 'TripMind AI',
    year: '2026',
    genre: 'Generative AI • Multi-Agent Systems • Travel',
    logline:
      'A multi-agent AI travel planner that coordinates travel research and itinerary planning through connected tools.',
    stack: [
      'Python',
      'FastAPI',
      'LangGraph',
      'LangChain',
      'Groq LLM',
      'MCP',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    build: [
      'Developed a multi-agent travel-planning workflow using LangGraph and FastAPI.',
      'Connected travel research tools through MCP integrations for flight, hotel, weather, and itinerary workflows.',
      'Worked with PostgreSQL-based workflow checkpointing and Redis caching as part of the application architecture.',
    ],
    features: [
      'Multi-agent travel-planning workflow',
      'Flight research workflow',
      'Hotel research workflow',
      'Weather information workflow',
      'Itinerary generation',
      'MCP tool integration',
      'Workflow checkpointing',
    ],
    metrics: [
      { value: 'AI', label: 'multi-agent workflow' },
      { value: 'MCP', label: 'tool integration' },
      { value: 'API', label: 'FastAPI backend' },
    ],
    github: 'https://github.com/vishuu-patil-001/TripMind-AI',
    demo: 'https://trip-mind-ai-tau.vercel.app/',
    palette: {
      from: '#071b30',
      via: '#10506b',
      to: '#05080d',
      accent: '#4cc9ff',
    },
    motif: 'flow',
  },
  {
    id: 'applijobtrack',
    title: 'AppliJobTrack',
    year: '2025–2026',
    genre: 'Full-Stack • MERN • Productivity',
    logline:
      'A full-stack job application tracker for organising applications and following their progress through a visual workflow.',
    stack: [
      'React',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Axios',
      'Recharts',
    ],
    build: [
      'Built a full-stack job application tracker with React, Express.js, Node.js, and MongoDB.',
      'Implemented authentication, protected routes, and user-specific application data.',
      'Developed create, read, update, and delete operations alongside search, filtering, and visual analytics.',
    ],
    features: [
      'User registration and login',
      'JWT-based authentication',
      'Protected routes and APIs',
      'Create, view, update, and delete applications',
      'Saved → Applied → OA → Interview → Offer → Accepted workflow',
      'Search and filtering',
      'Priority and interview tracking',
      'Application analytics',
    ],
    metrics: [
      { value: 'MERN', label: 'full-stack architecture' },
      { value: 'JWT', label: 'authentication' },
      { value: '6', label: 'application stages' },
    ],
    github: 'https://github.com/vishuu-patil-001/AppliJobTrack',
    demo: 'https://applijobtrack.onrender.com/login',
    palette: {
      from: '#082016',
      via: '#126347',
      to: '#050a08',
      accent: '#46e3a8',
    },
    motif: 'shield',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'lenscode-bharat',
    title: 'State-Level Selection',
    org: 'OpenAI Academy × NxtWave Buildathon',
    detail:
      'Selected for the state-level round with the LensCode Bharat project.',
    laurel: 'State-Level Selection',
  },
  {
    id: 'dipex',
    title: 'Event Volunteer',
    org: 'DIPEX Pune',
    detail:
      'Contributed as a volunteer during the DIPEX event in Pune.',
    laurel: 'Volunteering',
  },
];

export type Certification = {
  issuer: string;
  name: string;
  link: string;
};

export const certifications: Certification[] = [
  {
    issuer: 'Infosys Springboard',
    name: 'Programming Fundamentals Using Python',
    link: 'https://infyspringboard.onwingspan.com/',
  },
];

export type Skill = {
  name: string;
  mono: string;
  note?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  subtitle: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    subtitle: 'Core languages for application development',
    skills: [
      { name: 'JavaScript', mono: 'Js' },
      { name: 'Python', mono: 'Py' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'User interfaces and web applications',
    skills: [
      { name: 'React', mono: 'Re' },
      { name: 'HTML', mono: 'Ht' },
      { name: 'CSS', mono: 'Cs' },
      { name: 'React Router', mono: 'RR' },
      { name: 'Axios', mono: 'Ax' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Application logic and integrations',
    skills: [
      { name: 'Node.js', mono: 'No' },
      { name: 'Express.js', mono: 'Ex' },
      { name: 'FastAPI', mono: 'Fa' },
      { name: 'REST APIs', mono: 'Ap' },
      { name: 'JWT Authentication', mono: 'Jw' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Generative AI',
    subtitle: 'LLMs, agents, and connected tools',
    skills: [
      { name: 'LLMs', mono: 'LL' },
      { name: 'LangGraph', mono: 'Lg' },
      { name: 'LangChain', mono: 'Lc' },
      { name: 'AI Agents', mono: 'Ag' },
      { name: 'MCP', mono: 'Mc' },
      { name: 'Prompt Engineering', mono: 'Pe' },
      { name: 'Groq LLM', mono: 'Gq' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Data',
    subtitle: 'Data storage, queries, and caching',
    skills: [
      { name: 'MongoDB', mono: 'Mg' },
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'MySQL', mono: 'My' },
      { name: 'Redis', mono: 'Rd' },
      { name: 'SQL', mono: 'Sq' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Deployment',
    subtitle: 'Development, testing, and delivery',
    skills: [
      { name: 'Git', mono: 'Gt' },
      { name: 'GitHub', mono: 'Gh' },
      { name: 'Docker', mono: 'Dk' },
      { name: 'Docker Compose', mono: 'Dc' },
      { name: 'Postman', mono: 'Pm' },
      { name: 'Vercel', mono: 'Ve' },
      { name: 'Render', mono: 'Rn' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'CS Fundamentals',
    subtitle: 'Core software engineering concepts',
    skills: [
      { name: 'Data Structures & Algorithms', mono: 'Ds' },
      { name: 'OOP', mono: 'Oo' },
      { name: 'DBMS', mono: 'Db' },
      { name: 'Operating Systems', mono: 'OS' },
      { name: 'Computer Networks', mono: 'CN' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  JavaScript: ['AppliJobTrack', 'React applications'],
  Python: [
    'TripMind AI',
    'Cognifyz Technologies internship',
    'Infosys Springboard certification',
  ],
  React: ['AppliJobTrack'],
  HTML: ['Web development'],
  CSS: ['Web development'],
  'React Router': ['AppliJobTrack'],
  Axios: ['AppliJobTrack'],
  'Node.js': ['AppliJobTrack'],
  'Express.js': ['AppliJobTrack'],
  FastAPI: ['TripMind AI'],
  'REST APIs': ['TripMind AI', 'AppliJobTrack'],
  'JWT Authentication': ['AppliJobTrack'],
  LLMs: ['TripMind AI'],
  LangGraph: ['TripMind AI'],
  LangChain: ['TripMind AI'],
  'AI Agents': ['TripMind AI'],
  MCP: ['TripMind AI'],
  'Prompt Engineering': ['Generative AI development'],
  'Groq LLM': ['TripMind AI'],
  MongoDB: ['AppliJobTrack'],
  PostgreSQL: ['TripMind AI architecture'],
  MySQL: ['Database knowledge'],
  Redis: ['TripMind AI architecture'],
  SQL: ['Database querying and concepts'],
  Git: ['Project repositories'],
  GitHub: ['Project repositories'],
  Docker: ['TripMind AI'],
  'Docker Compose': ['TripMind AI'],
  Postman: ['API development and testing'],
  Vercel: ['TripMind AI deployment'],
  Render: ['AppliJobTrack deployment'],
  'Data Structures & Algorithms': ['Computer science fundamentals'],
  OOP: ['Computer science fundamentals'],
  DBMS: ['Computer science fundamentals'],
  'Operating Systems': ['Computer science fundamentals'],
  'Computer Networks': ['Computer science fundamentals'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = {
  from: '#24060b',
  via: '#6e0d1d',
  to: '#09070a',
  accent: '#ff3d5a',
};

const amber: Palette = {
  from: '#1c1003',
  via: '#6b3c06',
  to: '#0a0806',
  accent: '#ffb547',
};

const ocean: Palette = {
  from: '#04121f',
  via: '#0f4c6e',
  to: '#05080d',
  accent: '#4cc9ff',
};

const violet: Palette = {
  from: '#120822',
  via: '#3d1a6e',
  to: '#07060c',
  accent: '#b98bff',
};

const jade: Palette = {
  from: '#03150f',
  via: '#0d5a40',
  to: '#050a08',
  accent: '#46e3a8',
};

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Foundation',
    period: '2023 – 2027',
    synopsis:
      'Building a foundation in Information Technology, programming, and software engineering.',
    episodes: [
      {
        code: 'V01 E01',
        title: 'The IT Student',
        description:
          "Pursuing a Bachelor of Engineering in Information Technology at JSPM's Jayawantrao Sawant College of Engineering in Pune.",
        tags: ['B.E. Information Technology', 'SPPU'],
        runtime: '2023 – 2027',
        palette: ocean,
      },
    ],
  },
  {
    number: 2,
    title: 'Building Full-Stack',
    period: '2025 – 2026',
    synopsis:
      'Building complete web applications, from React interfaces to backend APIs and database operations.',
    episodes: [
      {
        code: 'V02 E01',
        title: 'The Full-Stack Builder',
        description:
          'Building AppliJobTrack with React, Node.js, Express.js, and MongoDB.',
        tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        runtime: 'AppliJobTrack',
        palette: jade,
      },
      {
        code: 'V02 E02',
        title: 'The API Engineer',
        description:
          'Working with REST APIs, authentication, protected routes, and database operations.',
        tags: ['REST APIs', 'JWT', 'CRUD'],
        runtime: 'Full-stack development',
        palette: amber,
      },
    ],
  },
  {
    number: 3,
    title: 'The AI Chapter',
    period: '2026',
    synopsis:
      'Exploring multi-agent AI workflows, LLM integrations, and connected tools.',
    episodes: [
      {
        code: 'V03 E01',
        title: 'The AI Builder',
        description:
          'Developing TripMind AI, a multi-agent travel planner built with FastAPI and LangGraph.',
        tags: ['Python', 'FastAPI', 'LangGraph'],
        runtime: 'TripMind AI',
        palette: violet,
      },
      {
        code: 'V03 E02',
        title: 'The Tool Integrator',
        description:
          'Connecting travel research workflows with MCP tools and supporting application services.',
        tags: ['MCP', 'LLMs', 'AI Agents'],
        runtime: 'TripMind AI',
        palette: ocean,
      },
    ],
  },
  {
    number: 4,
    title: 'Recognition & Growth',
    period: '2025 – 2026',
    synopsis:
      'Gaining practical experience through internship tasks, project development, volunteering, and buildathon participation.',
    episodes: [
      {
        code: 'V04 E01',
        title: 'The Intern',
        description:
          'Completed Python development tasks during an internship at Cognifyz Technologies.',
        tags: ['Python', 'Internship'],
        runtime: 'Dec 2025 – Jan 2026',
        palette: amber,
      },
      {
        code: 'V04 E02',
        title: 'The Buildathon Selection',
        description:
          'Selected for the state-level round with LensCode Bharat at the OpenAI Academy × NxtWave Buildathon.',
        tags: ['Buildathon', 'LensCode Bharat'],
        runtime: 'State-level round',
        palette: crimson,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: '2026 – 2027',
    synopsis:
      'Continuing to grow as a software engineer with a focus on full-stack development and AI-powered applications.',
    episodes: [
      {
        code: 'V05 E01',
        title: 'The Next Chapter',
        description:
          'Focused on software engineering, full-stack development, Generative AI, and AI agents.',
        tags: ['SDE', 'Generative AI', 'System Design'],
        runtime: 'In progress',
        palette: jade,
      },
    ],
  },
];

export type TopPick = {
  label: string;
  title: string;
  detail: string;
  palette: Palette;
};

export const topPicks: TopPick[] = [
  {
    label: 'Featured AI project',
    title: 'TripMind AI',
    detail: 'Multi-agent AI travel planner',
    palette: ocean,
  },
  {
    label: 'Featured full-stack project',
    title: 'AppliJobTrack',
    detail: 'Full-stack MERN job application tracker',
    palette: jade,
  },
  {
    label: 'AI workflow',
    title: 'LangGraph',
    detail: 'Multi-agent workflow orchestration',
    palette: violet,
  },
  {
    label: 'Backend development',
    title: 'FastAPI',
    detail: 'Python APIs for AI applications',
    palette: amber,
  },
  {
    label: 'Frontend development',
    title: 'React',
    detail: 'Interactive web applications',
    palette: crimson,
  },
  {
    label: 'Data storage',
    title: 'MongoDB',
    detail: 'Database for AppliJobTrack',
    palette: jade,
  },
  {
    label: 'Tool integration',
    title: 'MCP',
    detail: 'Connecting AI workflows with tools',
    palette: ocean,
  },
  {
    label: 'Development practice',
    title: 'Git & GitHub',
    detail: 'Version control and project repositories',
    palette: violet,
  },
  {
    label: 'Buildathon recognition',
    title: 'LensCode Bharat',
    detail: 'State-level round selection',
    palette: amber,
  },
  {
    label: 'Current focus',
    title: 'Software Engineering × AI',
    detail: 'Building practical intelligent applications',
    palette: crimson,
  },
];

/** Slides for the cinematic introduction. */
export type IntroSlide = {
  kicker: string;
  title: string;
  lines: string[];
  chips?: string[];
};

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Introduction',
    title: 'VISHWJIT UPASE',
    lines: [
      'Software Engineering × AI',
      'B.E. Information Technology undergraduate · Pune, India',
    ],
    chips: ['SDE', 'Generative AI', 'Full-Stack'],
  },
  {
    kicker: 'Technical focus',
    title: 'Build. Integrate. Deploy.',
    lines: [
      'JavaScript · Python',
      'React · Node.js · Express.js · FastAPI',
      'LangGraph · LangChain · MCP · Databases',
    ],
    chips: ['React', 'FastAPI', 'LangGraph'],
  },
  {
    kicker: 'Featured project',
    title: 'TripMind AI',
    lines: [
      'A multi-agent AI travel planner',
      'FastAPI · LangGraph · LLMs · MCP',
    ],
    chips: ['AI Agents', 'Tool Integration'],
  },
  {
    kicker: 'Featured project',
    title: 'AppliJobTrack',
    lines: [
      'A full-stack job application tracker',
      'React · Node.js · Express.js · MongoDB',
    ],
    chips: ['MERN', 'JWT', 'Analytics'],
  },
  {
    kicker: 'Experience',
    title: 'Python Development Intern',
    lines: [
      'Cognifyz Technologies',
      'December 2025 – January 2026',
    ],
  },
  {
    kicker: 'Recognition',
    title: 'LensCode Bharat',
    lines: [
      'OpenAI Academy × NxtWave Buildathon',
      'Selected for the state-level round',
    ],
  },
  {
    kicker: 'Current focus',
    title: 'Software Engineering × AI',
    lines: [
      'Full-Stack Development',
      'Generative AI · AI Agents · Software Engineering',
    ],
  },
];

export type ProfileId =
  | 'vishwjit'
  | 'recruiter'
  | 'developer'
  | 'creative';

export type SectionId =
  | 'about'
  | 'journey'
  | 'originals'
  | 'picks'
  | 'skills'
  | 'moments'
  | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    // Keep this internal ID until App.tsx and its profile logic are updated.
    id: 'vishwjit',
    name: 'Vishwjit',
    blurb: 'Explore my complete portfolio',
    color: '#4cc9ff',
    order: [
      'about',
      'journey',
      'originals',
      'picks',
      'skills',
      'moments',
      'story',
    ],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Projects, skills, and experience first',
    color: '#4cc9ff',
    order: [
      'originals',
      'skills',
      'moments',
      'about',
      'journey',
      'picks',
      'story',
    ],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, technologies, and GitHub first',
    color: '#46e3a8',
    order: [
      'originals',
      'skills',
      'journey',
      'about',
      'moments',
      'picks',
      'story',
    ],
  },
  {
    id: 'creative',
    name: 'My Journey',
    blurb: 'Explore the story behind my work',
    color: '#ffb547',
    order: [
      'journey',
      'picks',
      'originals',
      'moments',
      'about',
      'skills',
      'story',
    ],
  },
];

export const sectionMeta: Record<
  SectionId,
  { nav: string; card: string; meta: string; palette: Palette }
> = {
  about: {
    nav: 'About',
    card: 'About Me',
    meta: 'Profile • Education & experience',
    palette: violet,
  },
  journey: {
    nav: 'Journey',
    card: 'My Journey',
    meta: `${seasons.length} Chapters`,
    palette: amber,
  },
  originals: {
    nav: 'Projects',
    card: 'Featured Projects',
    meta: `${projects.length} Projects`,
    palette: crimson,
  },
  picks: {
    nav: 'Highlights',
    card: "Vishwjit's Top Picks",
    meta: 'Selected projects and technologies',
    palette: jade,
  },
  skills: {
    nav: 'Skills',
    card: 'Technical Skills',
    meta: `${skillCategories.length} Categories`,
    palette: ocean,
  },
  moments: {
    nav: 'Achievements',
    card: 'Achievements & Certifications',
    meta: `${achievements.length} Highlights • ${certifications.length} Certification`,
    palette: crimson,
  },
  story: {
    nav: 'Resume',
    card: 'My Resume',
    meta: 'Resume • View & download',
    palette: violet,
  },
};
