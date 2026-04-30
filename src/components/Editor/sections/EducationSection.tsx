import { useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import type { SectionItem } from '../../../types';
import TextField from '../../FormFields/TextField';

interface EducationSectionProps {
  sectionId: string;
}

export default function EducationSection({ sectionId }: EducationSectionProps) {
  const { resume, addItem, updateItem, removeItem } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const section = resume.sections.find((s: any) => s.id === sectionId);
  if (!section) return null;

  const handleAddItem = () => {
    const id = `edu-${Date.now()}`;
    const item: SectionItem = {
      id,
      school: '',
      degree: '',
      field: '',
      graduationDate: '',
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
                  label="School/University"
                  placeholder="MIT"
                  value={(item.school as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'school', value)}
                />
                <TextField
                  label="Degree"
                  placeholder="Bachelor of Science"
                  value={(item.degree as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'degree', value)}
                />
                <TextField
                  label="Field of Study"
                  placeholder="Computer Science"
                  value={(item.field as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'field', value)}
                />
                <TextField
                  label="Graduation Date"
                  placeholder="May 2020"
                  value={(item.graduationDate as string) || ''}
                  onChange={(value: string) => handleUpdateField(item.id, 'graduationDate', value)}
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
                <p className="font-medium text-gray-900">{(item.school as string) || 'School'}</p>
                <p className="text-sm text-gray-700">{(item.degree as string) || 'Degree'}</p>
                {item.graduationDate && (
                  <p className="text-xs text-gray-500">{item.graduationDate}</p>
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
        + Add Education
      </button>
    </div>
  );
}
