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
                  helperText="Use bullet points or paragraphs"
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
                <p className="font-medium text-gray-900">
                  {(item.company as string) || 'Company'} - {(item.position as string) || 'Position'}
                </p>
                {item.startDate && (
                  <p className="text-xs text-gray-500">
                    {item.startDate} {item.endDate && `- ${item.endDate}`}
                  </p>
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
        + Add Experience
      </button>
    </div>
  );
}
