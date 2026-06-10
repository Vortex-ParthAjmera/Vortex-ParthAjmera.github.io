import { Experience, Education, Skill, Achievement, Publication } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'google-ambassador',
    role: 'Google Student Ambassador',
    organization: 'Google (via Communique India)',
    type: 'Tech / Community',
    period: 'May 2026 — Present',
    isActive: true,
    bullets: [
      'Selected for the 2026 cohort to spearhead the campus-wide #TeamGemini initiative.',
      'Serving as the primary bridge between Google for Developers and 500+ aspiring engineers.',
      'Driving interactive tech evangelism through hand-on Gemini SDK workshops, hacking sessions, and developer outreach programs.',
      'Collaborating with a nationwide network of GAs to deliver industry-standard resources and workshop pathways.'
    ]
  },
  {
    id: 'shastra-cfo',
    role: 'Co-Founder & CFO',
    organization: 'Shastra',
    type: 'Technology Startup',
    period: 'Jan 2025 — Present',
    isActive: true,
    bullets: [
      'Co-founded a dynamic technology venture and lead strategic financial forecasting, capital mapping, and research funding channels.',
      'Collaborating with executive leadership on budget management and long-term business scaling pathways.'
    ]
  },
  {
    id: 'astrophysics-intern',
    role: 'Research Intern — Astrophysics',
    organization: 'Ethical Edufabrica × IIT Guwahati',
    type: 'Research',
    period: 'Sep 2025 — Oct 2025',
    bullets: [
      'Executed a high-rigour collaborative research paper on the "Exploration of Dark Matter," utilizing deep analytical modeling and space-tech frameworks.',
      'Employed advanced data models to benchmark astrophysics theories, gaining deep experience in scientific documentation.'
    ]
  },
  {
    id: 'student-council-president',
    role: 'Student Council President (Pradhan Mantri)',
    organization: 'JNSVM Inter College, Bareilly',
    type: 'Leadership',
    period: 'May 2023 — Mar 2024',
    bullets: [
      'Elected to govern and represent a vibrant student fraternity of 1,500+ pupils.',
      'Supervised and organized over 12 school-wide cultural festivals, academic contests, and sports assemblies spanning vendor logistics and operations.'
    ]
  },
  {
    id: 'student-council-vp',
    role: 'Student Council Vice President (Up-Pradhan Mantri)',
    organization: 'JNSVM Inter College, Bareilly',
    type: 'Leadership',
    period: 'May 2022 — Mar 2023',
    bullets: [
      'Coordinated legislative structures in the student parliament and backed major student-faculty integration initiatives.',
      'Drove campus-wide discipline programs and weekly activity reporting protocols.'
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: 'doon-university',
    degree: 'Bachelor of Technology (CSE)',
    school: 'Doon University, Dehradun',
    period: 'Aug 2025 — May 2029 (Expected)',
    gpa: '8.86',
    gpaLabel: 'SGPA / 10',
    bullets: [
      'Specialising in Data Structures, Advanced Algorithms, Systems Programing, and Modern OS.',
      'Assigned custom portfolios on Quantum Computing and High-Performance Supercomputing hardware architectural pathways.',
      'Actively preparing algorithmic structures in C++ for upcoming GSoC open-source programs.'
    ]
  },
  {
    id: 'jnsvm-inter-college',
    degree: 'Higher Secondary Certificate (PCM)',
    school: 'JNSVM Inter College, Bareilly',
    period: 'Jan 2022 — May 2024',
    gpa: 'Vidyalaya Ratna',
    gpaLabel: 'Student of the Year Honors',
    bullets: [
      'Honored with the highest institutional crown recognizing supreme academic and leadership caliber.',
      'Bagged multiple state and district trophies in inter-school scientific presentations and competitive debate.',
      'Maintained exemplary tracks across core Physics, Chemistry, and Mathematics fields.'
    ]
  }
];

export const TECHNICAL_SKILLS: Skill[] = [
  { name: 'Python (AI/ML & Data)', percentage: 90 },
  { name: 'C / C++ (Systems Coding)', percentage: 85 },
  { name: 'Linux Command Line & Bash scripting', percentage: 80 },
  { name: 'Git & GitHub Open Source Workflows', percentage: 80 },
  { name: 'Docker & Microservices', percentage: 70 },
  { name: 'React SPA & Database Querying', percentage: 65 }
];

export const SOFT_SKILLS = [
  'Technical Evangelism',
  'Strategic Leadership',
  'Public Speaking & Oratory',
  'Financial Forecasting',
  'Complex Scientific Writing',
  'Community Management'
];

export const CERTIFICATIONS = [
  'Google Gemini Developer Pathway',
  'Docker & Containerized Orchestration',
  'Microsoft Security Copilot AI Agents',
  'React Frontend Architecture',
  'Figma UX Design Bootcamp'
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-prosperity',
    icon: '📈',
    tag: 'Quantitative Trading · 2026',
    title: 'IMC Prosperity 4 — Top 19%',
    description: 'Secured a spot in the Top 19% globally competing against 18,809 teams across 117 countries in the IMC Prosperity 4 quantitative trading challenge, designing advanced algorithmic trading workflows.'
  },
  {
    id: 'ach-bigcode',
    icon: '💻',
    tag: 'Competitive Coding · 2026',
    title: 'Google Big Code 2026 — Rank Under 1500',
    description: 'Ranked globally in the top 1500 coders during the Google Big Code 2026 engineering challenge, showcasing elite algorithmic design and extreme low-level systems speed.'
  },
  {
    id: 'ach-startup',
    icon: '🥈',
    tag: 'Startup · 2025',
    title: 'Innovation & Startup Conclave 2025',
    description: 'Bagged Second Place globally among 50+ innovative engineering teams, demonstrating strategic financial viability with projected ROI grids.'
  },
  {
    id: 'ach-student-year',
    icon: '🏆',
    tag: 'Academic Honorship',
    title: 'Vidyalaya Ratna — Student of the Year',
    description: 'Crowned with JNSVM’s peak honor across 1,500 students for academic persistence, parliamentary contribution, and community leadership.'
  },
  {
    id: 'ach-science',
    icon: '🥇',
    tag: 'Research & Sciences',
    title: 'District Science Championship Winner',
    description: 'Secured the first rank in technical presentation evaluated by an expert scientific panel of academics, beating out 40+ competitor labs.'
  },
  {
    id: 'ach-oratory',
    icon: '🎤',
    tag: 'Oratory & Debating',
    title: '8+ Championship Oratory Cups',
    description: 'Sealed more than 8 gold championships around competitive speech panels, specifically advocating public awareness, thought-ethics, and social reform.'
  },
  {
    id: 'ach-google',
    icon: '⚡',
    tag: 'Google Program',
    title: 'campus Lead — #TeamGemini',
    description: 'Elected to promote the state-of-the-art Gemini ecosystem inside Doon University, arranging masterclasses on foundational multimodal prompts.'
  },
  {
    id: 'ach-darkmatter',
    icon: '🌌',
    tag: 'Research',
    title: 'IIT Guwahati Astrophysics Collab',
    description: 'Completed intricate research tracking cold dark matter candidates, analyzing orbital galaxy rotation velocities with deep space-tech models.'
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-ramayana-child',
    title: '6 Special Places to Bring the Ramayana Alive for Children',
    medium: 'Sanatan Yatra (RNI Registered: UPBIL05206)',
    date: 'Oct 2025',
    url: 'https://sanatanyatra.in/e-magazine/'
  },
  {
    id: 'pub-ramayana-visit',
    title: 'Five Ramayana Places You Can Visit Today',
    medium: 'Sanatan Yatra (RNI Registered: UPBIL05206)',
    date: 'Sep 2025',
    url: 'https://sanatanyatra.in/e-magazine/'
  },
  {
    id: 'pub-vedas',
    title: 'किस वेद में क्या लिखा है? (What is Written in Which Veda?)',
    medium: 'Sanatan Yatra (RNI Registered: UPBIL05206)',
    date: 'Nov 2024',
    url: 'https://sanatanyatra.in/e-magazine/'
  },
  {
    id: 'pub-nausar',
    title: 'Nausar Mata: The Establishment of Adishakti',
    medium: 'Sanatan Yatra (RNI Registered: UPBIL05206)',
    date: 'Oct 2024',
    url: 'https://sanatanyatra.in/e-magazine/'
  },
  {
    id: 'pub-anand',
    title: 'Anand-kanan of Mahadev',
    medium: 'Sanatan Yatra (RNI Registered: UPBIL05206)',
    date: 'Feb 2024',
    url: 'https://sanatanyatra.in/e-magazine/'
  },
  {
    id: 'pub-namaskar',
    title: 'Significance, Benefits, and Method of Namaskar',
    medium: 'Sanatan Yatra (RNI Registered: UPBIL05206)',
    date: 'Jan 2024',
    url: 'https://sanatanyatra.in/e-magazine/'
  }
];
