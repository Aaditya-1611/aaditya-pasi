export interface Project {
  id: string;
  title: string;
  description: string;
  demoLink?: string;
  codeLink?: string;
  tags: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  email: string;
  skills: string[];
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  themeColor: "violet" | "teal" | "emerald" | "amber" | "rose" | "blue";
  projects: Project[];
  experiences: Experience[];
  avatarUrl?: string;
}
