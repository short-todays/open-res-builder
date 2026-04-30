
import { useState } from 'react';
import ResumeEditor from './components/Editor/ResumeEditor';
import Header from './components/Header';
import ResumePreview from './components/Preview/ResumePreview';

export default function App() {
  const [previewWidth, setPreviewWidth] = useState(50);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = previewWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diff = moveEvent.clientX - startX;
      const container = document.querySelector('.main-container');
      if (!container) return;

      const containerWidth = container.clientWidth;
      const newWidth = Math.max(30, Math.min(70, startWidth + (diff / containerWidth) * 100));
      setPreviewWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="main-container flex flex-1 overflow-hidden">
        {/* Editor */}
        <div style={{ width: `${100 - previewWidth}%` }} className="flex flex-col overflow-hidden">
          <ResumeEditor />
        </div>

        {/* Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1 bg-gray-200 hover:bg-primary-500 cursor-col-resize transition-colors"
        />

        {/* Preview */}
        <div style={{ width: `${previewWidth}%` }} className="flex flex-col overflow-hidden bg-gray-100">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
