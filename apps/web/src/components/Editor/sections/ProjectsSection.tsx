import type { SectionItem } from '@open-resume-builder/shared/types';
import { useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import TextField from '../../FormFields/TextField';

interface ProjectsSectionProps {
  sectionId: string;
}

export default function ProjectsSection({ sectionId }: ProjectsSectionProps) {
  const { resume, addItem, updateItem, removeItem } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const section = resume.sections.find((s: any) => s.id === sectionId);
  if (!section) return null;

  const handleAddItem = () => {
    const id = `proj-${Date.now()}`;
    const item: SectionItem = {
      id,
      name: '',
      description: '',
      technologies: '',
      link: '',
    };
    addItem(sectionId, item);
    setExpandedId(id);
  };

  const handleUpdateField = (itemId: string, field: string, value: string) => {
    updateItem(sectionId, itemId, { [field]: value } as Record<string, string>);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700 dark:border-slate-700">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white">{section.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{section.items.length} {section.items.length === 1 ? 'project' : 'projects'}</p>
        </div>
      </div>

      {/* Items Container */}
      <div className="px-5 py-4 space-y-3 flex-1 overflow-y-auto">
        {section.items.map((item: any) => (
          <div key={item.id} className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
            {expandedId === item.id ? (
              <div className="p-4 space-y-4 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-900/20">
                <TextField
                  label="Project Name"
                  placeholder="E-commerce Platform"
                  value={(item.name as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'name', value)}
                />
                <TextField
                  label="Description"
                  placeholder="Brief description of the project..."
                  value={(item.description as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'description', value)}
                  multiline
                  rows={3}
                />
                <TextField
                  label="Technologies"
                  placeholder="React, Node.js, MongoDB"
                  value={(item.technologies as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'technologies', value)}
                  helperText="Comma-separated list"
                />
                <TextField
                  label="Link (optional)"
                  placeholder="https://github.com/user/project"
                  value={(item.link as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'link', value)}
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setExpandedId(null)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => removeItem(sectionId, item.id)}
                    className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              < div
                onClick={() => setExpandedId(item.id)
                }
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {(item.name as string) || '(No name)'}
                </p>
                {item.technologies && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{item.technologies}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-700">
        <button
          onClick={handleAddItem}
          className="w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
        >
          + Add Project
        </button>
      </div>
    </div>
  );
}

