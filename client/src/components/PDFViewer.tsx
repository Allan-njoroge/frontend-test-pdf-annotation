"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { AnnotationLayer } from "./annotations/AnnotationLayer";
import { AnnotationType } from "@/utils/types";
import { HighlightTool } from "./annotations/HighlightTool";
import { useEffect, useRef, useState, useCallback } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";

type PropType = {
  numPages: number;
  setNumPages: (pages: number) => void;
  pdfFile: string;
  annotations: AnnotationType[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPageClick?: (e: React.MouseEvent) => void;
  onHighlight: (selection: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  isHighlightActive: boolean;
  highlightColor: string;
};

export const PDFViewer = ({
  numPages,
  setNumPages,
  pdfFile,
  annotations,
  currentPage,
  setCurrentPage,
  onPageClick,
  onHighlight,
  isHighlightActive,
  highlightColor,
}: PropType) => {
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize page refs array
  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, numPages);
  }, [numPages]);

  // Get the correct ref callback type
  const setPageRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      pageRefs.current[index] = el;
    },
    []
  );

  // Detect which page is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let mostVisiblePage = 1;
      let minDistance = Infinity;

      pageRefs.current.forEach((pageEl, index) => {
        if (!pageEl) return;

        const pageRect = pageEl.getBoundingClientRect();
        const pageCenter = pageRect.top + pageRect.height / 2;
        const distance = Math.abs(pageCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          mostVisiblePage = index + 1;
        }
      });

      if (mostVisiblePage !== currentPage) {
        setCurrentPage(mostVisiblePage);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [numPages, currentPage, setCurrentPage]);

  if (!pdfFile) return <p>No PDF available.</p>;

  return (
    <div
      ref={containerRef}
      className="px-16 py-10 mx-auto w-full flex justify-center overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <div className="space-y-10">
          {Array.from({ length: numPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <div
                ref={setPageRef(index)}
                key={`page_${pageNumber}`}
                className={`relative ${
                  currentPage === pageNumber ? "active-page" : ""
                }`}
                style={{ width: "fit-content" }}
              >
                <div className="relative">
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="border-2 border-gray-200"
                    onClick={onPageClick}
                  />
                  <div className="absolute inset-0 z-10">
                    <AnnotationLayer
                      annotations={annotations}
                      currentPage={pageNumber}
                    />
                  </div>
                  {currentPage === pageNumber && (
                    <HighlightTool
                      isActive={isHighlightActive}
                      color={highlightColor}
                      onHighlight={onHighlight}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Document>
    </div>
  );
};
