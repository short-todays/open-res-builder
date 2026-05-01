import jsPDF from 'jspdf';
import type { Resume, ResumeSection, SectionItem } from '../types';

export interface PDFExportOptions {
  filename?: string;
  resume?: Resume;
}

export const downloadResumePDF = (options: PDFExportOptions = {}) => {
  const {
    filename = 'resume.pdf',
    resume,
  } = options;

  if (!resume) {
    console.error('Resume data not provided');
    return;
  }

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

  // Sections
  resume.sections.forEach((section) => {
    if (!section.visible || section.items.length === 0) return;

    checkPageBreak(20);

    // Section Title
    setFont(11, 'bold');
    doc.text(section.title.toUpperCase(), margin, yPosition);
    yPosition += 6;
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;

    // Section Items
    section.items.forEach((item: any) => {
      checkPageBreak(15);
      renderSectionItem(doc, item, section, margin, contentWidth, (y) => {
        yPosition = y;
      });
    });

    yPosition += 2;
  });

  // Download
  const pdfFilename = `${filename}.pdf`;
  doc.save(pdfFilename);
};

const renderSectionItem = (
  doc: jsPDF,
  item: SectionItem,
  section: ResumeSection,
  margin: number,
  contentWidth: number,
  updateY: (y: number) => void
) => {
  let yPos = (doc as any).internal.pageSize.getHeight() - 12;
  const currentY = doc.internal.pageSize.getHeight() - 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');

  if (section.id === 'experience') {
    doc.text(String(item.company || ''), margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`${String(item.position || '')}`, margin + 2, currentY + 4);
    if (item.startDate || item.endDate) {
      doc.text(
        `${String(item.startDate || '')} ${item.endDate ? `- ${String(item.endDate)}` : ''}`,
        margin + 2,
        currentY + 8
      );
    }
    if (item.description) {
      const descLines = doc.splitTextToSize(String(item.description), contentWidth - 4);
      doc.text(descLines, margin + 2, currentY + 12);
      yPos = currentY + 12 + descLines.length * 3;
    }
  } else if (section.id === 'education') {
    doc.text(String(item.school || ''), margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`${String(item.degree || '')}${item.field ? ` in ${String(item.field)}` : ''}`, margin + 2, currentY + 4);
    if (item.graduationDate) {
      doc.text(`Graduation: ${String(item.graduationDate)}`, margin + 2, currentY + 8);
    }
    yPos = currentY + 10;
  } else if (section.id === 'skills') {
    doc.text(`${String(item.category || '')}:`, margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(String(item.items || ''), margin + 2, currentY + 4);
    yPos = currentY + 8;
  } else if (section.id === 'projects') {
    doc.text(String(item.name || ''), margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    if (item.technologies) {
      doc.text(`Tech: ${String(item.technologies)}`, margin + 2, currentY + 4);
    }
    if (item.description) {
      const descLines = doc.splitTextToSize(String(item.description), contentWidth - 4);
      doc.text(descLines, margin + 2, currentY + 8);
      yPos = currentY + 8 + descLines.length * 3;
    }
  } else if (section.id === 'certifications') {
    doc.text(String(item.name || ''), margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    if (item.issuer) doc.text(`${String(item.issuer)}`, margin + 2, currentY + 4);
    if (item.date) doc.text(`${String(item.date)}`, margin + 2, currentY + 8);
    yPos = currentY + 10;
  } else if (section.id === 'achievements') {
    doc.text(String(item.title || ''), margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    if (item.description) {
      const descLines = doc.splitTextToSize(String(item.description), contentWidth - 4);
      doc.text(descLines, margin + 2, currentY + 4);
      yPos = currentY + 4 + descLines.length * 3;
    }
  } else if (section.id === 'publications') {
    doc.text(String(item.title || ''), margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    if (item.publisher) doc.text(`${String(item.publisher)}`, margin + 2, currentY + 4);
    if (item.date) doc.text(`${String(item.date)}`, margin + 2, currentY + 8);
    yPos = currentY + 10;
  }

  updateY(yPos);
};
