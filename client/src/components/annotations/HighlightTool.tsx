"use client";

import { useState, useEffect } from "react";

type HighlightToolProps = {
  isActive: boolean;
  color: string;
  onHighlight: (selection: { x: number; y: number; width: number; height: number; page: number }) => void;
};

export const HighlightTool = ({ isActive, color, onHighlight }: HighlightToolProps) => {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setStartPos(null);
      setCurrentPos(null);
      setIsDragging(false);
    }
  }, [isActive]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive) return;
    setIsDragging(true);
    const target = e.currentTarget as HTMLElement;
    const pageElement = target.closest('.react-pdf__Page');
    if (!pageElement) return;

    const rect = pageElement.getBoundingClientRect();
    setStartPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isActive || !startPos || !isDragging) return;
    const target = e.currentTarget as HTMLElement;
    const pageElement = target.closest('.react-pdf__Page');
    if (!pageElement) return;

    const rect = pageElement.getBoundingClientRect();
    setCurrentPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseUp = () => {
    if (startPos && currentPos) {
      onHighlight({
        x: Math.min(startPos.x, currentPos.x),
        y: Math.min(startPos.y, currentPos.y),
        width: Math.abs(currentPos.x - startPos.x),
        height: Math.abs(currentPos.y - startPos.y),
        page: -1, // This is still a placeholder - the page is determined in PDFViewer
      });
    }
    setStartPos(null);
    setCurrentPos(null);
    setIsDragging(false);
  };

  return (
    <div
      className={`absolute inset-0 ${isActive ? "block" : "hidden"} z-10 cursor-text`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {startPos && currentPos && (
        <div
          className="absolute opacity-40 pointer-events-none bg-yellow-200"
          style={{
            left: `${Math.min(startPos.x, currentPos.x)}px`,
            top: `${Math.min(startPos.y, currentPos.y)}px`,
            width: `${Math.abs(currentPos.x - startPos.x)}px`,
            height: `${Math.abs(currentPos.y - startPos.y)}px`,
            backgroundColor: color,
          }}
        />
      )}
    </div>
  );
};