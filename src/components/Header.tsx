import { useResumeStore } from '../store/resumeStore';

export default function Header() {
  const { resetResume } = useResumeStore();

  const handleDownloadPDF = () => {
    alert('PDF export coming soon!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your resume? This cannot be undone.')) {
      resetResume();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
        <p className="text-sm text-gray-500">ATS-Friendly • Real-time Preview</p>
      </div>

      <div className="flex items-center gap-3">
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
    </header>
  );
}
