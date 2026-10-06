export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface JourneyItem {
  id: number;
  type: 'education' | 'certification' | 'leadership';
  title: string;
  organization: string;
  year: string;
  details: string;
}

export interface ContactInfo {
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Interest {
  label: string;
}

export const stats: Stat[] = [
  { label: 'Apps Shipped', value: 2 },
  { label: 'Automated Tests', value: 30 },
  { label: 'REST Endpoints', value: 11 },
  { label: 'Team Members Led', value: 5 },
];

export const interests: Interest[] = [
  { label: 'Full-Stack Web Development' },
  { label: 'Applied AI/ML Systems' },
  { label: 'Data Structures & Algorithms' },
];

export const skills: SkillCategory[] = [
  {
    name: 'Languages',
    items: ['Java', 'Python', 'C', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'Frameworks',
    items: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Tailwind CSS'],
  },
  {
    name: 'Databases',
    items: ['MySQL', 'MongoDB', 'SQLite', 'SQLAlchemy'],
  },
  {
    name: 'Tools',
    items: ['Git/GitHub', 'VS Code', 'Eclipse', 'Postman', 'Vite'],
  },
  {
    name: 'Core Concepts',
    items: [
      'REST API Design',
      'Data Structures & Algorithms',
      'Policy-Based System Design',
      'Automated Testing (pytest)',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'RecoverFlow',
    description:
      'AI-Driven Subscription Payment Recovery System (Razorpay AI Buildathon 2026, Track 3: AI Revenue Recovery)',
    stack: ['FastAPI', 'React', 'TypeScript', 'SQLAlchemy', 'SQLite'],
    highlights: [
      'Diagnoses failed subscription payments and generates recovery recommendations, with all financial actions gated through a deterministic Python policy engine.',
      'Results: 20.82% recovery rate (₹76,453 recovered of ₹3,67,200 at risk), 88% retry success, 100% payment-link recovery across a 100-payment test batch.',
      '8 hard safety constraints (retry caps, recovery amount limits, mandate-revocation stops).',
      '11 REST endpoints and 30 automated tests, including verification that AI recommendations cannot override hard compliance stops.',
    ],
    githubUrl: 'https://github.com/Madhav-Naidu/RecoverFlow',
  },
  {
    id: 2,
    title: 'TrackZen',
    description: 'Attendance Management System (2025)',
    stack: ['Node.js', 'Express.js', 'MongoDB'],
    highlights: [
      'Full-stack system for digitally tracking and managing student attendance.',
      'Led a team of 5 as Project Head, coordinating frontend-backend integration and timely delivery.',
      'Secure login, role-based dashboards, subject-wise attendance history, notifications and profile management.',
    ],
    githubUrl: 'https://github.com/Madhav-Naidu/TrackZen-Attendance-System',
  },
];

export const journey: JourneyItem[] = [
  {
    id: 1,
    type: 'education',
    title: 'Diploma in Computer Science & Engineering',
    organization: 'Sanketika Polytechnic College',
    year: '2025',
    details: 'Graduated with 84%',
  },
  {
    id: 2,
    type: 'education',
    title: 'SSC',
    organization: 'Narayana E-Techno School',
    year: '2022',
    details: 'Graduated with 75%',
  },
  {
    id: 3,
    type: 'certification',
    title: 'Java Full Stack Development',
    organization: 'Pixel Winds',
    year: '2025',
    details: '',
  },
  {
    id: 4,
    type: 'certification',
    title: 'Introduction to Data Science',
    organization: 'Infosys Springboard',
    year: '2025',
    details: '',
  },
  {
    id: 5,
    type: 'certification',
    title: 'Introduction to Prompt Engineering',
    organization: 'SimpliLearn SkillUp',
    year: '2025',
    details: '',
  },
  {
    id: 6,
    type: 'leadership',
    title: 'Project Head',
    organization: 'TrackZen',
    year: '2025',
    details:
      'Led planning, task allocation and execution for 5 members, and resolved technical and coordination challenges to stay on schedule.',
  },
];

export const contact: ContactInfo = {
  location: 'Bobbili, Vizianagaram, Andhra Pradesh - 535558',
  email: 'kenguvamadhavnaidu@gmail.com',
  phone: '+91 9704959226',
  linkedin: 'https://linkedin.com/in/kenguvamadhavnaidu',
  github: 'https://github.com/Madhav-Naidu',
};

export const hero = {
  name: 'Kenguva Madhav Naidu',
  role: 'Java Full Stack Developer',
  tagline:
    'Ships complete applications end-to-end, with an emphasis on safe, tested and auditable system design.',
  githubUrl: 'https://github.com/Madhav-Naidu',
};

export const about = `Full-stack developer who has shipped two complete applications end-to-end: RecoverFlow, an AI-backed subscription payment recovery system built for the Razorpay AI Buildathon 2026, and TrackZen, an attendance management platform led as Project Head for a 5-person team. Works across FastAPI, Node.js/Express, React, MySQL and MongoDB.`;

export const footer = 'KMN. 2025 — Built with React, Three.js & Tailwind CSS';