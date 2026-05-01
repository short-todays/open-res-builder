import PersonalInfoForm from './PersonalInfoForm';
import ReorderSectionsPanel from './ReorderSectionsPanel';
import SectionManager from './SectionManager';
import SummaryForm from './SummaryForm';

export default function ResumeEditor() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900">

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 max-w-2xl space-y-6">

          {/* Personal Information Card */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-xs font-bold">👤</span>
                Personal Information
              </h2>
            </div>
            <div className="px-5 py-4">
              <PersonalInfoForm />
            </div>
          </div>

          {/* Professional Summary Card */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 text-xs font-bold">✓</span>
                Professional Summary
              </h2>
            </div>
            <div className="px-5 py-4">
              <SummaryForm />
            </div>
          </div>

          {/* Dynamic Sections */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 px-1">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 text-xs font-bold">+</span>
              Resume Sections
            </h2>
            <ReorderSectionsPanel />
            <SectionManager />
          </div>

          {/* Bottom Padding */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
