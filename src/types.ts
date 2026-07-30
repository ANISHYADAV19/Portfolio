export interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  technologies: string[];
  githubUrl?: string;
  category: 'AI' | 'Web' | 'Edge';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: number;
  bullets: string[];
  badgeColor: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; info?: string }[];
}
