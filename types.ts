export interface CourseDay {
  id: string;
  day: string;
  title: string;
  duration: string;
  modules: string[];
}

export interface Session {
  title: string;
  time: string;
  objectives: string[];
  content: {
    title: string;
    details?: string[];
    type: 'module' | 'exercise' | 'project' | 'break';
    duration?: string;
  }[];
}

export interface DetailedDay {
  id: string;
  title: string;
  subtitle: string;
  sessions: Session[];
}

export interface DeliverableCategory {
  category: string;
  count: number;
  items: string[];
}

export interface Benefit {
  id: string;
  text: string;
  icon: 'check' | 'zap' | 'file' | 'calendar';
}

export enum AppView {
  LANDING = 'LANDING',
  PLATFORM = 'PLATFORM'
}

export interface GeneratedHook {
  hook: string;
  rationale: string;
}

export interface AIGenResponse {
  text: string;
}