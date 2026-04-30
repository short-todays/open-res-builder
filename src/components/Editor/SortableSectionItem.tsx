import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ResumeSection } from '../../types';

interface SortableSectionItemProps {
  section: ResumeSection;
  index: number;
  total: number;
}

export default function SortableSectionItem({ section, index, total }: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`px-4 py-3 flex items-center gap-3 transition-all duration-200 ${isDragging ? 'bg-blue-50 dark:bg-blue-900/20 shadow-md' : isOver ? 'bg-gray-50 dark:bg-slate-700' : 'hover:bg-gray-50 dark:hover:bg-slate-700'
        }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        title="Drag to reorder"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 11-4 0 2 2 0 014 0zM7 6a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zM17 2a2 2 0 11-4 0 2 2 0 014 0zM17 6a2 2 0 11-4 0 2 2 0 014 0zM17 10a2 2 0 11-4 0 2 2 0 014 0zM7 14a2 2 0 11-4 0 2 2 0 014 0zM17 14a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      {/* Section Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{section.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {section.items.length} {section.items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Position Indicator */}
      <div className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
        <span className="font-medium">{index + 1}</span>
        <span>/</span>
        <span>{total}</span>
      </div>

      {/* Drag Indicator Badge */}
      {isDragging && (
        <div className="flex-shrink-0 text-blue-500 dark:text-blue-400 text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded">
          Moving
        </div>
      )}
    </div>
  );
}