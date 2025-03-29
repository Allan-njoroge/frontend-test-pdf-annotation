"use client";
import { AnnotationType } from "@/utils/types";

type AnnotationLayerProps = {
  annotations: AnnotationType[];
  currentPage: number;
};

export const AnnotationLayer = ({ annotations, currentPage }: AnnotationLayerProps) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {annotations
        .filter(ann => ann.page === currentPage)
        .map((annotation) => {
          switch (annotation.type) {
            case 'highlight':
              return (
                <div
                  key={annotation.id}
                  className="absolute opacity-40"
                  style={{
                    left: `${annotation.x}px`,
                    top: `${annotation.y}px`,
                    width: `${annotation.width}px`,
                    height: `${annotation.height}px`,
                    backgroundColor: annotation.color,
                  }}
                />
              );
            case 'comment':
              return (
                <div
                  key={annotation.id}
                  className="absolute bg-yellow-100 p-1 text-xs border border-yellow-300 rounded"
                  style={{
                    left: `${annotation.x}px`,
                    top: `${annotation.y}px`,
                  }}
                >
                  {annotation.text}
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );
};