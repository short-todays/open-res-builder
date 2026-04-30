import { useResumeStore } from '../../store/resumeStore';

export default function ResumePreview() {
  const { resume } = useResumeStore();
  const { personal, summary, sections } = resume;

  const renderSectionItem = (section: any, item: any) => {
    // Experience
    if (section.id === 'experience') {
      return (
        <div key={item.id} className="mb-5">
          <div className="mb-1">
            <p className="font-bold text-black">{item.company}</p>
            <p className="text-black">{item.position}</p>
          </div>
          {(item.startDate || item.endDate) && (
            <p className="text-black text-sm mb-2">
              {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
            </p>
          )}
          {item.description && (
            <p className="text-black text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
          )}
        </div>
      );
    }

    // Projects
    if (section.id === 'projects') {
      return (
        <div key={item.id} className="mb-5">
          <div className="mb-1">
            <p className="font-bold text-black">{item.name}</p>
          </div>
          {item.technologies && (
            <p className="text-black text-sm mb-2">
              Technologies: {item.technologies}
            </p>
          )}
          {item.description && (
            <p className="text-black text-sm leading-relaxed">{item.description}</p>
          )}
        </div>
      );
    }

    // Education
    if (section.id === 'education') {
      return (
        <div key={item.id} className="mb-5">
          <div className="mb-1">
            <p className="font-bold text-black">{item.school}</p>
            <p className="text-black">{item.degree}</p>
          </div>
          {item.field && (
            <p className="text-black text-sm mb-2">{item.field}</p>
          )}
          {item.graduationDate && (
            <p className="text-black text-sm">
              Graduation: {item.graduationDate}
            </p>
          )}
        </div>
      );
    }

    // Skills
    if (section.id === 'skills') {
      return (
        <div key={item.id} className="mb-3">
          <p className="font-bold text-black">{item.category}</p>
          <p className="text-black text-sm">{item.items}</p>
        </div>
      );
    }

    // Certifications
    if (section.id === 'certifications') {
      return (
        <div key={item.id} className="mb-4">
          <p className="font-bold text-black">{item.name}</p>
          {item.issuer && (
            <p className="text-black text-sm">{item.issuer}</p>
          )}
          {item.date && (
            <p className="text-black text-sm">
              {item.date}
            </p>
          )}
        </div>
      );
    }

    // Achievements
    if (section.id === 'achievements') {
      return (
        <div key={item.id} className="mb-4">
          <p className="font-bold text-black">{item.title}</p>
          {item.description && (
            <p className="text-black text-sm leading-relaxed mt-1">{item.description}</p>
          )}
        </div>
      );
    }

    // Publications
    if (section.id === 'publications') {
      return (
        <div key={item.id} className="mb-4">
          <p className="font-bold text-black">{item.title}</p>
          {item.publisher && (
            <p className="text-black text-sm">{item.publisher}</p>
          )}
          {item.date && (
            <p className="text-black text-sm">
              {item.date}
            </p>
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
            <p key={key} className="text-sm text-black mb-1">
              <strong>{key}:</strong> {String(value)}
            </p>
          ))}
      </div>
    );
  };

  // Format contact info as pipe-separated line
  const contactInfo = [
    personal.email,
    personal.phone,
    personal.location,
  ]
    .filter(Boolean)
    .join(' | ');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white p-12 min-h-full max-w-4xl mx-auto font-sans" id="resume-preview">
          {/* Header */}
          <header className="mb-6 pb-4 border-b border-black">
            <h1 className="text-3xl font-bold text-black mb-1">{personal.name || 'Your Name'}</h1>
            {contactInfo && (
              <p className="text-black text-sm leading-relaxed">{contactInfo}</p>
            )}
          </header>

          {/* Summary */}
          {summary && (
            <section className="mb-6">
              <h2 className="text-sm font-bold text-black uppercase mb-2 pb-1 border-b border-black">
                Professional Summary
              </h2>
              <p className="text-black text-sm leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Sections */}
          {sections
            .filter((section) => section.visible && section.items.length > 0)
            .map((section) => (
              <section key={section.id} className="mb-6">
                <h2 className="text-sm font-bold text-black uppercase mb-3 pb-1 border-b border-black">
                  {section.title}
                </h2>
                <div className="ml-0">
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
