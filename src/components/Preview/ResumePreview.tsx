import { useResumeStore } from '../../store/resumeStore';
import { useTemplateStore } from '../../store/templateStore';
import { getTemplate } from '../../templates';

export default function ResumePreview() {
  const { resume } = useResumeStore();
  const { selectedTemplate } = useTemplateStore();
  const template = getTemplate(selectedTemplate);
  const { personal, summary, sections } = resume;

  const renderSectionItem = (section: any, item: any) => {
    // Use template's formatter if available
    const lines = template.formatSectionItem(section, item);

    return (
      <div key={item.id} className="mb-4">
        {lines.map((line, idx) => {
          // Detect bold lines (like company, position, degree)
          const isBold = idx === 0 || line.includes('—') || line.includes('|');
          return (
            <p
              key={idx}
              className={`text-black text-sm leading-relaxed whitespace-pre-wrap ${isBold ? 'font-bold' : ''
                }`}
            >
              {line}
            </p>
          );
        })}
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

  // Order sections based on template or use default
  const orderedSections = template.sectionOrder
    ? template.sectionOrder
      .map((sectionId) => sections.find((s) => s.id === sectionId))
      .filter(Boolean)
    : sections;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-slate-800">
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
          {(orderedSections as any[])
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
          {(orderedSections as any[]).filter((s) => s.visible && s.items.length > 0).length === 0 && !summary && (
            <div className="text-center py-12 text-gray-400">
              <p>Start adding content to see your resume preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
