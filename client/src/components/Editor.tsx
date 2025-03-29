"use client";

import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import { PDFViewer } from "./PDFViewer";
import { useAnnotations } from "@/hooks/useAnnotation";
import { usePDFTools } from "@/hooks/usePDFTools";
import { Button } from "./ui/button";

const Editor = ({
  pdfFile,
  onRemove,
}: {
  pdfFile: string | null;
  onRemove: () => void;
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isHighlightActive, setIsHighlightActive] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("#FFFF0080");
  const { isSaving, savePdfWithAnnotations, downloadPdf } = usePDFTools();
  const { annotations, addAnnotation, clearPageAnnotations } = useAnnotations();
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

  useEffect(() => {
    if (!pdfFile) return;
    const loadPdf = async () => {
      try {
        const response = await fetch(pdfFile);
        const arrayBuffer = await response.arrayBuffer();
        setPdfBytes(new Uint8Array(arrayBuffer));
      } catch (error) {
        console.error("Failed to load PDF:", error);
      }
    };
    loadPdf();
  }, [pdfFile]);

  const handleExport = async () => {
    if (!pdfBytes) return;
    try {
      const modifiedPdf = await savePdfWithAnnotations(
        pdfBytes,
        annotations,
        currentPage
      );
      downloadPdf(modifiedPdf, "annotated-document.pdf");
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleShowSignaturePad = () => {
    console.log("Signature Pad Triggered");
    // Implement signature pad logic here
  };

  return (
    <div className="relative w-full min-h-screen">
      <Toolbar
        numPages={numPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
        onClearAnnotations={() => clearPageAnnotations(currentPage)}
        onShowSignaturePad={handleShowSignaturePad}
        onExport={handleExport}
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />
      <PDFViewer
        pdfFile={pdfFile || ""}
        numPages={numPages}
        setNumPages={setNumPages}
        annotations={annotations}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onHighlight={(selection) => {
          addAnnotation({
            ...selection,
            type: "highlight",
            page: currentPage,
            color: selectedColor, 
          });
        }}
        isHighlightActive={isHighlightActive}
        highlightColor={selectedColor}
      />
      <Button
        variant="destructive"
        onClick={onRemove}
        className="absolute top-4 right-4"
      >
        Remove PDF
      </Button>
    </div>
  );
};

export default Editor;
