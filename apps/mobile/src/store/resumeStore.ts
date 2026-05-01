import type { Resume } from '@open-resume-builder/shared';
import { create } from 'zustand';

interface ResumeStore {
  resume: Resume | null;
  setResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<Resume['personal']>) => void;
  updateSummary: (summary: string) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: null,
  setResume: (resume) => set({ resume }),
  updatePersonalInfo: (info) =>
    set((state) => ({
      resume: state.resume
        ? { ...state.resume, personal: { ...state.resume.personal, ...info } }
        : null,
    })),
  updateSummary: (summary) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, summary } : null,
    })),
  resetResume: () => set({ resume: null }),
}));
