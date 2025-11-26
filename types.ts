
export interface ProjectDetail {
  text: string;
  link?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: ProjectDetail[];
  images: string[]; 
  video?: string; // YouTube ID or URL
  mainLink?: string; // For the "Data" section button
  tags: string[];
  honors?: string[]; // New field for Awards list
}

export interface NavItem {
  label: string;
  targetId: string;
}

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}
