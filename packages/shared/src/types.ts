export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface SectionItem {
  id: string;
  [key: string]: string | number | boolean;
}

export interface ResumeSection {
  id: string;
  title: string;
  visible: boolean;
  items: SectionItem[];
}

export interface Resume {
  personal: PersonalInfo;
  summary: string;
  sections: ResumeSection[];
}

export const SECTION_DEFINITIONS = {
  experience: {
    id: 'experience',
    title: 'Experience',
    fields: ['company', 'position', 'startDate', 'endDate', 'description'],
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    fields: ['name', 'description', 'technologies', 'link'],
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    fields: ['category', 'items'],
  },
  education: {
    id: 'education',
    title: 'Education',
    fields: ['school', 'degree', 'field', 'graduationDate'],
  },
  certifications: {
    id: 'certifications',
    title: 'Certifications',
    fields: ['name', 'issuer', 'date', 'credentialUrl'],
  },
  achievements: {
    id: 'achievements',
    title: 'Achievements',
    fields: ['title', 'description', 'date'],
  },
  publications: {
    id: 'publications',
    title: 'Publications',
    fields: ['title', 'publisher', 'date', 'url'],
  },
} as const;
