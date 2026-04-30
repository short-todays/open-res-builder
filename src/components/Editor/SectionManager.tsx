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
        <div className="space-y-3">
          {sections.map((section) => {
            const Component = sectionComponents[section.id];
            return (
              <div key={section.id}>
                {Component && (
                  <Component sectionId={section.id} />
                )}
                {!Component && (
                  <div className="p-3 bg-gray-100 rounded border border-gray-300">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{section.title}</p>
                      <button
                        onClick={() => removeSection(section.id)}
                        className="btn-secondary btn-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Section */}
      {availableSections.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Add Section</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleAddSection(section.id)}
                className="px-3 py-2 bg-white border border-primary-300 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors"
              >
                + {section.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {sections.length === 0 && availableSections.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">All sections added</p>
      )}
    </div>
  );
}
