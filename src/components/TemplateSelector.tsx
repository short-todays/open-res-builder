import { useTemplateStore } from '../store/templateStore';
import { ALL_TEMPLATES } from '../templates';

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useTemplateStore();
  const currentTemplate = ALL_TEMPLATES.find((t) => t.id === selectedTemplate);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="template-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Template:
      </label>
      <select
        id="template-select"
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        title={currentTemplate?.description}
        className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm hover:border-gray-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {ALL_TEMPLATES.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
