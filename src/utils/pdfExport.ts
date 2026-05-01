import jsPDF from 'jspdf';
import { getTemplate } from '../templates';
import type { Resume, ResumeSection } from '../types';

export interface PDFExportOptions {
  filename?: string;
  resume?: Resume;
  templateId?: string;
}

export const downloadResumePDF = (options: PDFExportOptions = {}) => {
  const {
    filename = 'resume.pdf',
    resume,
    templateId = 'modern',
  } = options;

  if (!resume) {
    console.error('Resume data not provided');
    return;
  }

  const template = getTemplate(templateId);
  const doc = new jsPDF({
    unit: 'mm',
    format: 'letter',
    orientation: 'portrait',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  const setFont = (size: number, weight: 'normal' | 'bold' = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', weight);
  };

  const addText = (text: string, x: number = margin, fontSize: number = 11, weight: 'normal' | 'bold' = 'normal') => {
    setFont(fontSize, weight);
    const lines = doc.splitTextToSize(text, contentWidth - (x === margin ? 0 : margin));
    doc.text(lines, x, yPosition);
    yPosition += lines.length * (fontSize * 0.35) + 2;
    return lines;
  };

  const checkPageBreak = (minSpace: number = 15) => {
    if (yPosition + minSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Header - Name & Contact
  setFont(16, 'bold');
  doc.text(resume.personal.name || 'Your Name', margin, yPosition);
  yPosition += 8;

  const contactInfo = [
    resume.personal.email,
    resume.personal.phone,
    resume.personal.location,
  ]
    .filter(Boolean)
    .join(' • ');

  if (contactInfo) {
    addText(contactInfo, margin, 10);
  }

  yPosition += 4;

  // Summary
  if (resume.summary) {
    checkPageBreak(20);
    setFont(11, 'bold');
    doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
    yPosition += 6;
    setFont(10, 'bold');
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;
    addText(resume.summary, margin, 10);
    yPosition += 2;
  }

  // Sections - ordered by template
  const orderedSections = template.sectionOrder
    ? template.sectionOrder
        .map((sectionId) => resume.sections.find((s) => s.id === sectionId))
        .filter(Boolean)
    : resume.sections;

  (orderedSections as ResumeSection[]).forEach((section) => {
    if (!section.visible || section.items.length === 0) return;

    checkPageBreak(20);

    // Section Title
    setFont(11, 'bold');
    doc.text(section.title.toUpperCase(), margin, yPosition);
    yPosition += 6;
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;

    // Section Items - use template formatter
    section.items.forEach((item: any) => {
      checkPageBreak(10);
      const lines = template.formatSectionItem(section, item);
      setFont(10, 'normal');

      lines.forEach((line) => {
        const textLines = doc.splitTextToSize(line, contentWidth - 2);
        doc.text(textLines, margin + 1, yPosition);
        yPosition += textLines.length * 3 + 1;
      });

      yPosition += 2;
    });

    yPosition += 2;
  });

  // Download
  const pdfFilename = `${filename}.pdf`;
  doc.save(pdfFilename);
};
