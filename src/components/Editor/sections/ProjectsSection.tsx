import { useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import type { SectionItem } from '../../../types';
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
    updateItem(sectionId, itemId, { [field]: value } as any);
  };

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">{section.title}</h4>
        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
          {section.items.length} items
        </span>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {section.items.map((item: any) => (
          <div key={item.id} className="bg-white p-3 rounded border border-gray-300">
            {expandedId === item.id ? (
              <div className="space-y-3">
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
                <div className="flex gap-2">
                  <button
                    onClick={() => setExpandedId(null)}
                    className="btn-secondary btn-sm"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => removeItem(sectionId, item.id)}
                    className="btn-secondary btn-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setExpandedId(item.id)}
                className="cursor-pointer space-y-1 hover:bg-gray-50"
              >
                <p className="font-medium text-gray-900">{(item.name as string) || 'Project'}</p>
                {item.technologies && (
                  <p className="text-xs text-gray-500">{item.technologies}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddItem}
        className="w-full py-2 text-sm text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
      >
        + Add Project
      </button>
    </div>
  );
}
