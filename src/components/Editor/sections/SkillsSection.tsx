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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div>
          <h4 className="font-semibold text-gray-900">{section.title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{section.items.length} {section.items.length === 1 ? 'group' : 'groups'}</p>
        </div>
      </div>

      {/* Items Container */}
      <div className="px-5 py-4 space-y-3 flex-1 overflow-y-auto">
        {section.items.map((item: any) => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
            {expandedId === item.id ? (
              <div className="p-4 space-y-4 bg-blue-50">
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
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setExpandedId(null)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => removeItem(sectionId, item.id)}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setExpandedId(item.id)}
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-gray-900 text-sm">
                  {(item.category as string) || '(No category)'}
                </p>
                {item.items && (
                  <p className="text-xs text-gray-500 mt-1.5 truncate">{item.items}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="px-5 py-3 border-t border-gray-100">
        <button
          onClick={handleAddItem}
          className="w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
        >
          + Add Skill Category
        </button>
      </div>
    </div>
  );
}
