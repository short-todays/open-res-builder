import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import SortableSectionItem from './SortableSectionItem';

export default function ReorderSectionsPanel() {
  const { resume, reorderSections } = useResumeStore();
  const { sections } = resume;
  const [isOpen, setIsOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newOrder = arrayMove(sections, oldIndex, newIndex);
      reorderSections(newOrder);
    }
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 rounded-lg transition-colors flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">⋮⋮</span>
          Reorder Sections ({sections.length})
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Reorder Panel */}
      {isOpen && (
        <div className="mt-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {sections.map((section, index) => (
                  <SortableSectionItem
                    key={section.id}
                    section={section}
                    index={index}
                    total={sections.length}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Footer Info */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 border-t border-gray-100 dark:border-slate-700 text-xs text-gray-500 dark:text-gray-400">
            Drag sections to reorder them
          </div>
        </div>
      )}
    </div>
  );
}
