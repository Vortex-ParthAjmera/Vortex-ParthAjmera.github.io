export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: string;
  period: string;
  isActive?: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  gpa?: string;
  gpaLabel?: string;
  bullets: string[];
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface Achievement {
  id: string;
  icon: string;
  tag: string;
  title: string;
  description: string;
}

export interface Publication {
  id: string;
  title: string;
  medium: string;
  date: string;
  url: string;
}
