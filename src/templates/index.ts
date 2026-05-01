import type { ResumeTemplate } from '../types/templates';

// Modern Template - Clean, contemporary design
export const modernTemplate: ResumeTemplate = {
  id: 'modern',
  name: 'Modern',
  description: 'Clean and contemporary design with emphasis on achievements',
  sectionOrder: ['experience', 'projects', 'education', 'skills', 'certifications', 'achievements', 'publications'],
  styling: {
    headerSize: 16,
    sectionTitleSize: 11,
    spacing: 2,
  },
  formatSectionItem: (section, item: any) => {
    const lines: string[] = [];

    if (section.id === 'experience') {
      lines.push(`${item.company || ''} — ${item.position || ''}`);
      if (item.startDate || item.endDate) {
        lines.push(`${item.startDate || ''} ${item.endDate ? `— ${item.endDate}` : ''}`);
      }
      if (item.description) {
        lines.push(item.description);
      }
    } else if (section.id === 'education') {
      lines.push(`${item.degree || ''} in ${item.field || ''}`);
      lines.push(item.school || '');
      if (item.graduationDate) {
        lines.push(`Graduated: ${item.graduationDate}`);
      }
    } else if (section.id === 'projects') {
      lines.push(`${item.name || ''} — ${item.technologies || ''}`);
      if (item.description) {
        lines.push(item.description);
      }
      if (item.link) {
        lines.push(`Link: ${item.link}`);
      }
    } else if (section.id === 'skills') {
      lines.push(`${item.category}: ${item.items}`);
    } else if (section.id === 'certifications') {
      lines.push(`${item.name} — ${item.issuer}`);
      if (item.date) lines.push(`Date: ${item.date}`);
    } else if (section.id === 'achievements') {
      lines.push(`• ${item.title}`);
      if (item.description) lines.push(`  ${item.description}`);
    } else if (section.id === 'publications') {
      lines.push(`${item.title}`);
      if (item.publisher) lines.push(`Publisher: ${item.publisher}`);
      if (item.date) lines.push(`Date: ${item.date}`);
    }

    return lines.filter(Boolean);
  },
};

// Classic Template - Traditional professional layout
export const classicTemplate: ResumeTemplate = {
  id: 'classic',
  name: 'Classic',
  description: 'Traditional professional format, ATS-optimized',
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'publications'],
  styling: {
    headerSize: 14,
    sectionTitleSize: 10,
    spacing: 1.5,
  },
  formatSectionItem: (section, item: any) => {
    const lines: string[] = [];

    if (section.id === 'experience') {
      lines.push(`${item.company} | ${item.position}`);
      lines.push(`${item.startDate} - ${item.endDate || 'Present'}`);
      if (item.description) {
        lines.push(item.description);
      }
    } else if (section.id === 'education') {
      lines.push(`${item.school}`);
      lines.push(`${item.degree}${item.field ? ` in ${item.field}` : ''}`);
      if (item.graduationDate) lines.push(item.graduationDate);
    } else if (section.id === 'projects') {
      lines.push(`${item.name}`);
      lines.push(`Technologies: ${item.technologies}`);
      if (item.description) lines.push(item.description);
    } else if (section.id === 'skills') {
      lines.push(`${item.category}: ${item.items}`);
    } else if (section.id === 'certifications') {
      lines.push(`${item.name} - ${item.issuer}`);
      if (item.date) lines.push(item.date);
    } else if (section.id === 'achievements') {
      lines.push(`${item.title}`);
      if (item.description) lines.push(item.description);
    } else if (section.id === 'publications') {
      lines.push(`${item.title}`);
      if (item.publisher) lines.push(item.publisher);
    }

    return lines.filter(Boolean);
  },
};

// Minimalist Template - Simple, ATS-friendly format
export const minimalistTemplate: ResumeTemplate = {
  id: 'minimalist',
  name: 'Minimalist',
  description: 'Simple, ATS-optimized format for maximum compatibility',
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'publications'],
  styling: {
    headerSize: 12,
    sectionTitleSize: 10,
    spacing: 1,
  },
  formatSectionItem: (section, item: any) => {
    const lines: string[] = [];

    if (section.id === 'experience') {
      lines.push(item.company);
      lines.push(item.position);
      lines.push(`${item.startDate} - ${item.endDate || 'Present'}`);
      if (item.description) lines.push(item.description);
    } else if (section.id === 'education') {
      lines.push(item.school);
      lines.push(item.degree);
      if (item.field) lines.push(item.field);
      if (item.graduationDate) lines.push(item.graduationDate);
    } else if (section.id === 'projects') {
      lines.push(item.name);
      if (item.technologies) lines.push(item.technologies);
      if (item.description) lines.push(item.description);
    } else if (section.id === 'skills') {
      lines.push(`${item.category}: ${item.items}`);
    } else if (section.id === 'certifications') {
      lines.push(item.name);
      if (item.issuer) lines.push(item.issuer);
      if (item.date) lines.push(item.date);
    } else if (section.id === 'achievements') {
      lines.push(item.title);
      if (item.description) lines.push(item.description);
    } else if (section.id === 'publications') {
      lines.push(item.title);
      if (item.publisher) lines.push(item.publisher);
      if (item.date) lines.push(item.date);
    }

    return lines.filter(Boolean);
  },
};

// Detailed Template - Matches the user's provided template structure
export const detailedTemplate: ResumeTemplate = {
  id: 'detailed',
  name: 'Detailed',
  description: 'Comprehensive format with detailed descriptions and structure',
  sectionOrder: ['experience', 'projects', 'education', 'skills', 'certifications', 'achievements', 'publications'],
  styling: {
    headerSize: 16,
    sectionTitleSize: 11,
    spacing: 2,
  },
  formatSectionItem: (section, item: any) => {
    const lines: string[] = [];

    if (section.id === 'experience') {
      lines.push(`${item.company} — ${item.position}`);
      lines.push(`${item.startDate} – ${item.endDate || 'Present'}`);
      if (item.description) {
        const bullets = item.description.split('\n').filter((l: string) => l.trim());
        bullets.forEach((bullet: string) => {
          lines.push(`• ${bullet.replace(/^•\s*/, '')}`);
        });
      }
    } else if (section.id === 'projects') {
      lines.push(item.name);
      lines.push(`Built using: ${item.technologies}`);
      if (item.description) lines.push(`Description: ${item.description}`);
      if (item.link) lines.push(`Link: ${item.link}`);
    } else if (section.id === 'education') {
      lines.push(item.degree);
      lines.push(item.school);
      if (item.field) lines.push(item.field);
      if (item.graduationDate) lines.push(item.graduationDate);
    } else if (section.id === 'skills') {
      lines.push(`${item.category}`);
      lines.push(item.items);
    } else if (section.id === 'certifications') {
      lines.push(item.name);
      lines.push(`Issuer: ${item.issuer}`);
      if (item.date) lines.push(`Date: ${item.date}`);
    } else if (section.id === 'achievements') {
      lines.push(item.title);
      if (item.description) lines.push(item.description);
    } else if (section.id === 'publications') {
      lines.push(item.title);
      lines.push(`Publisher: ${item.publisher}`);
      if (item.date) lines.push(`Date: ${item.date}`);
    }

    return lines.filter(Boolean);
  },
};

// Export all templates
export const ALL_TEMPLATES: ResumeTemplate[] = [modernTemplate, classicTemplate, minimalistTemplate, detailedTemplate];

export const getTemplate = (id: string): ResumeTemplate => {
  return ALL_TEMPLATES.find((t) => t.id === id) || modernTemplate;
};
