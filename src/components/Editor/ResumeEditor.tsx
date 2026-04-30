import PersonalInfoForm from './PersonalInfoForm';
import SectionManager from './SectionManager';
import SummaryForm from './SummaryForm';

export default function ResumeEditor() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Resume Editor</h2>

          {/* Personal Info Section */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Personal Information
            </h3>
            <PersonalInfoForm />
          </section>

          {/* Summary Section */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Professional Summary
            </h3>
            <SummaryForm />
          </section>

          {/* Dynamic Sections */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Resume Sections
            </h3>
            <SectionManager />
          </section>
        </div>
      </div>
    </div>
  );
}
