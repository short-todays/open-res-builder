import type { SectionItem } from './types';

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  formatSectionItem: (section: { id: string; title: string }, item: SectionItem) => string[];
  sectionOrder?: string[];
  styling?: {
    headerSize?: number;
    sectionTitleSize?: number;
    spacing?: number;
    colors?: {
      text?: string;
      divider?: string;
    };
  };
}
