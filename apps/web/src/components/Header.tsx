import { useResumeStore } from '../store/resumeStore';
import { useTemplateStore } from '../store/templateStore';
import { downloadResumePDF } from '../utils/pdfExport';
import TemplateSelector from './TemplateSelector';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { resume, resetResume } = useResumeStore();
  const { selectedTemplate } = useTemplateStore();

  const handleDownloadPDF = () => {
    const filename = resume.personal.name
      ? resume.personal.name.replace(/\s+/g, '-') + '-Resume'
      : 'Resume';
    downloadResumePDF({ filename, resume, templateId: selectedTemplate });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your resume? This cannot be undone.')) {
      resetResume();
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Builder</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">ATS-Friendly • Real-time Preview</p>
      </div>

      <div className="flex items-center gap-4">
        <TemplateSelector />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={handleDownloadPDF}
            className="btn-primary"
          >
            Download PDF
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
