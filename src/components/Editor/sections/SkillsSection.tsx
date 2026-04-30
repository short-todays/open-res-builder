import { useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import type { SectionItem } from '../../../types';
import TextField from '../../FormFields/TextField';

interface SkillsSectionProps {
  sectionId: string;
}

export default function SkillsSection({ sectionId }: SkillsSectionProps) {
  const { resume, addItem, updateItem, removeItem } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const section = resume.sections.find((s: any) => s.id === sectionId);
  if (!section) return null;

  const handleAddItem = () => {
    const id = `skill-${Date.now()}`;
    const item: SectionItem = {
      id,
      category: '',
      items: '',
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
          {section.items.length} groups
        </span>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {section.items.map((item: any) => (
          <div key={item.id} className="bg-white p-3 rounded border border-gray-300">
            {expandedId === item.id ? (
              <div className="space-y-3">
                <TextField
                  label="Category"
                  placeholder="Languages"
                  value={(item.category as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'category', value)}
                />
                <TextField
                  label="Skills"
                  placeholder="JavaScript, TypeScript, Python"
                  value={(item.items as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'items', value)}
                  helperText="Comma-separated list"
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
                <p className="font-medium text-gray-900">{(item.category as string) || 'Skills'}</p>
                {item.items && (
                  <p className="text-xs text-gray-500 truncate">{item.items}</p>
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
        + Add Skill Category
      </button>
    </div>
  );
}
