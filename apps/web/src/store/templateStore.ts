import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { modernTemplate } from '../templates';

interface TemplateStore {
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
}

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set) => ({
      selectedTemplate: modernTemplate.id,
      setSelectedTemplate: (templateId: string) =>
        set({
          selectedTemplate: templateId,
        }),
    }),
    {
      name: 'template-store',
    }
  )
);
