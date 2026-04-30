import { useResumeStore } from '../../store/resumeStore';
import type { ResumeSection } from '../../types';
import { SECTION_DEFINITIONS } from '../../types';
import AchievementsSection from './sections/AchievementsSection';
import CertificationsSection from './sections/CertificationsSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import PublicationsSection from './sections/PublicationsSection';
import SkillsSection from './sections/SkillsSection';

const sectionComponents: Record<string, React.ComponentType<{ sectionId: string }>> = {
  experience: ExperienceSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  education: EducationSection,
  certifications: CertificationsSection,
  achievements: AchievementsSection,
  publications: PublicationsSection,
};

export default function SectionManager() {
  const { resume, addSection, removeSection } = useResumeStore();
  const { sections } = resume;

  const availableSections = Object.values(SECTION_DEFINITIONS).filter(
    (def) => !sections.some((s) => s.id === def.id)
  );

  const handleAddSection = (sectionId: string) => {
    const definition = SECTION_DEFINITIONS[sectionId as keyof typeof SECTION_DEFINITIONS];
    if (!definition) return;

    const newSection: ResumeSection = {
      id: sectionId,
      title: definition.title,
      visible: true,
      items: [],
    };

    addSection(newSection);
  };

  return (
    <div className="space-y-4">
      {/* Current Sections */}
      {sections.length > 0 && (
        <div className="space-y-4">
          {sections.map((section) => {
            const Component = sectionComponents[section.id];
            return (
              <div key={section.id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                {Component ? (
                  <Component sectionId={section.id} />
                ) : (
                  <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
                    <p className="font-medium text-gray-900 dark:text-white">{section.title}</p>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                    >
                      ✕ Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Section */}
      {availableSections.length > 0 && (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm p-5">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Add Section</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleAddSection(section.id)}
                className="px-3 py-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200"
              >
                + {section.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {sections.length === 0 && availableSections.length === 0 && (
        <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">All sections added</p>
        </div>
      )}
    </div>
  );
}
