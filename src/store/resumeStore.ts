import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PersonalInfo, Resume, ResumeSection, SectionItem } from '../types';
import { DEFAULT_RESUME } from '../types';

interface ResumeStore {
  resume: Resume;

  // Personal info
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setSummary: (summary: string) => void;

  // Sections
  addSection: (section: ResumeSection) => void;
  removeSection: (sectionId: string) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  reorderSections: (sections: ResumeSection[]) => void;

  // Items
  addItem: (sectionId: string, item: SectionItem) => void;
  updateItem: (sectionId: string, itemId: string, updates: Partial<SectionItem>) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  reorderItems: (sectionId: string, items: SectionItem[]) => void;

  // General
  setResume: (resume: Resume) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: DEFAULT_RESUME,

      setPersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personal: {
              ...state.resume.personal,
              ...info,
            },
          },
        })),

      setSummary: (summary) =>
        set((state) => ({
          resume: {
            ...state.resume,
            summary,
          },
        })),

      addSection: (section) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: [...state.resume.sections, section],
          },
        })),

      removeSection: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.filter((s) => s.id !== sectionId),
          },
        })),

      toggleSectionVisibility: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId ? { ...s, visible: !s.visible } : s
            ),
          },
        })),

      reorderSections: (sections) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections,
          },
        })),

      addItem: (sectionId, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? { ...s, items: [...s.items, item] }
                : s
            ),
          },
        })),

      updateItem: (sectionId, itemId, updates) =>
        set((state) => {
          return {
            resume: {
              ...state.resume,
              sections: state.resume.sections.map((s) =>
                s.id === sectionId
                  ? {
                    ...s,
                    items: s.items.map((item) =>
                      item.id === itemId
                        ? ({ ...item, ...updates } as SectionItem)
                        : item
                    ),
                  }
                  : s
              ),
            },
          };
        }),

      removeItem: (sectionId, itemId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? { ...s, items: s.items.filter((item) => item.id !== itemId) }
                : s
            ),
          },
        })),

      reorderItems: (sectionId, items) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId ? { ...s, items } : s
            ),
          },
        })),

      setResume: (resume) => set({ resume }),

      resetResume: () => set({ resume: DEFAULT_RESUME }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
