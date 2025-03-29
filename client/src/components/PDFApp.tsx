"use client";
import { useState } from "react";
import Editor from "./Editor";
import Upload from "./Upload";

const PDFApp = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setPdfFile(file);
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setPdfUrl(null);
  };

  return (
    <div className="w-full h-screen">
      {pdfFile ? (
        <Editor pdfFile={pdfUrl} onRemove={handleRemoveFile} />
      ) : (
        <Upload onUpload={handleFileUpload} />
      )}
    </div>
  );
};

export default PDFApp;