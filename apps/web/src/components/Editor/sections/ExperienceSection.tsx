import { useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import type { SectionItem } from '../../../types';
import TextField from '../../FormFields/TextField';

interface ExperienceSectionProps {
  sectionId: string;
}

export default function ExperienceSection({ sectionId }: ExperienceSectionProps) {
  const { resume, addItem, updateItem, removeItem } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const section = resume.sections.find((s: any) => s.id === sectionId);
  if (!section) return null;

  const handleAddItem = () => {
    const id = `exp-${Date.now()}`;
    const item: SectionItem = {
      id,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
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
      <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700 dark:border-slate-700 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white">{section.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{section.items.length} {section.items.length === 1 ? 'entry' : 'entries'}</p>
        </div>
      </div>

      {/* Items Container */}
      <div className="px-5 py-4 space-y-3 flex-1 overflow-y-auto">
        {section.items.map((item: any) => (
          <div key={item.id} className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
            {expandedId === item.id ? (
              <div className="p-4 space-y-4 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-900/20">
                <TextField
                  label="Company"
                  placeholder="Acme Corporation"
                  value={(item.company as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'company', value)}
                />
                <TextField
                  label="Position"
                  placeholder="Senior Developer"
                  value={(item.position as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'position', value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Start Date"
                    placeholder="Jan 2020"
                    value={(item.startDate as string) || ''}
                    onChange={(value: string) => handleUpdateField(item.id, 'startDate', value)}
                  />
                  <TextField
                    label="End Date"
                    placeholder="Present"
                    value={(item.endDate as string) || ''}
                    onChange={(value: string) => handleUpdateField(item.id, 'endDate', value)}
                  />
                </div>
                <TextField
                  label="Description"
                  placeholder="Describe your responsibilities and achievements..."
                  value={(item.description as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'description', value)}
                  multiline
                  rows={3}
                  helperText="Use bullet points or short paragraphs"
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
              <div
                onClick={() => setExpandedId(item.id)}
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 dark:hover:bg-slate-700 transition-colors"
              >
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {(item.company as string) || '(No company)'}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">
                  {(item.position as string) || '(No position)'}
                </p>
                {item.startDate && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                    {item.startDate} {item.endDate && `— ${item.endDate}`}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-700 dark:border-slate-700">
        <button
          onClick={handleAddItem}
          className="w-full py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors"
        >
          + Add Experience
        </button>
      </div>
    </div>
  );
}
