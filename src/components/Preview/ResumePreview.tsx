import { useResumeStore } from '../../store/resumeStore';

export default function ResumePreview() {
  const { resume } = useResumeStore();
  const { personal, summary, sections } = resume;

  const renderSectionItem = (section: any, item: any) => {
    // Experience
    if (section.id === 'experience') {
      return (
        <div key={item.id} className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900">{item.company}</p>
              <p className="text-gray-700">{item.position}</p>
            </div>
            <p className="text-gray-600 text-xs whitespace-nowrap ml-4">
              {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
            </p>
          </div>
          {item.description && (
            <p className="text-gray-600 text-sm mt-1 whitespace-pre-wrap">{item.description}</p>
          )}
        </div>
      );
    }

    // Projects
    if (section.id === 'projects') {
      return (
        <div key={item.id} className="mb-4">
          <p className="font-semibold text-gray-900">{item.name}</p>
          {item.description && (
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          )}
          {item.technologies && (
            <p className="text-gray-600 text-xs mt-1">
              <strong>Technologies:</strong> {item.technologies}
            </p>
          )}
        </div>
      );
    }

    // Education
    if (section.id === 'education') {
      return (
        <div key={item.id} className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900">{item.school}</p>
              <p className="text-gray-700">{item.degree}</p>
              {item.field && (
                <p className="text-gray-600 text-sm">{item.field}</p>
              )}
            </div>
            {item.graduationDate && (
              <p className="text-gray-600 text-xs whitespace-nowrap ml-4">
                {item.graduationDate}
              </p>
            )}
          </div>
        </div>
      );
    }

    // Skills
    if (section.id === 'skills') {
      return (
        <div key={item.id} className="mb-3">
          <p className="font-semibold text-gray-900">{item.category}</p>
          <p className="text-gray-700 text-sm">{item.items}</p>
        </div>
      );
    }

    // Certifications
    if (section.id === 'certifications') {
      return (
        <div key={item.id} className="mb-3">
          <p className="font-semibold text-gray-900">{item.name}</p>
          {item.issuer && (
            <p className="text-gray-700 text-sm">{item.issuer}</p>
          )}
          {item.date && (
            <p className="text-gray-600 text-xs">{item.date}</p>
          )}
        </div>
      );
    }

    // Achievements
    if (section.id === 'achievements') {
      return (
        <div key={item.id} className="mb-3">
          <p className="font-semibold text-gray-900">{item.title}</p>
          {item.description && (
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          )}
        </div>
      );
    }

    // Publications
    if (section.id === 'publications') {
      return (
        <div key={item.id} className="mb-3">
          <p className="font-semibold text-gray-900">{item.title}</p>
          {item.publisher && (
            <p className="text-gray-700 text-sm">{item.publisher}</p>
          )}
          {item.date && (
            <p className="text-gray-600 text-xs">{item.date}</p>
          )}
        </div>
      );
    }

    // Fallback
    return (
      <div key={item.id} className="mb-3">
        {Object.entries(item)
          .filter(([key, value]) => key !== 'id' && value)
          .map(([key, value]) => (
            <p key={key} className="text-sm text-gray-700">
              <strong>{key}:</strong> {String(value)}
            </p>
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white p-8 min-h-full max-w-4xl mx-auto" id="resume-preview">
          {/* Header */}
          <header className="mb-6 pb-6 border-b-2 border-gray-300">
            <h1 className="text-3xl font-bold text-gray-900">{personal.name || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
              {personal.email && (
                <span>{personal.email}</span>
              )}
              {personal.phone && (
                <span>{personal.phone}</span>
              )}
              {personal.location && (
                <span>{personal.location}</span>
              )}
            </div>
          </header>

          {/* Summary */}
          {summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Professional Summary</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Sections */}
          {sections
            .filter((section) => section.visible && section.items.length > 0)
            .map((section) => (
              <section key={section.id} className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                <div>
                  {(section.items as any[]).map((item) => renderSectionItem(section, item))}
                </div>
              </section>
            ))}

          {/* Empty state */}
          {sections.filter((s) => s.visible && s.items.length > 0).length === 0 && !summary && (
            <div className="text-center py-12 text-gray-400">
              <p>Start adding content to see your resume preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
