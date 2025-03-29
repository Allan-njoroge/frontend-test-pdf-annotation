import { useState, useCallback } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { AnnotationType } from '@/utils/types';

export const usePDFTools = () => {
  const [isSaving, setIsSaving] = useState(false);

  const savePdfWithAnnotations = useCallback(
    async (originalPdf: Uint8Array, annotations: AnnotationType[], currentPage: number) => {
      setIsSaving(true);
      try {
        const pdfDoc = await PDFDocument.load(originalPdf);
        const pages = pdfDoc.getPages();

        // Process annotations sequentially to handle async operations
        for (const annotation of annotations.filter(ann => ann.page === currentPage)) {
          const page = pages[annotation.page - 1];
          
          switch (annotation.type) {
            case 'highlight':
              page.drawRectangle({
                x: annotation.x,
                y: annotation.y,
                width: annotation.width || 100,
                height: annotation.height || 20,
                color: rgb(1, 1, 0), // Yellow highlight
                opacity: 0.4,
              });
              break;
            
            case 'comment':
              page.drawText(annotation.text || '', {
                x: annotation.x,
                y: annotation.y,
                size: 12,
                color: rgb(0, 0, 0),
              });
              break;
            
            case 'signature':
              if (annotation.imageData) {
                try {
                  // Convert base64 to Uint8Array
                  const base64Data = annotation.imageData.replace(/^data:image\/\w+;base64,/, '');
                  const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
                  const signatureImage = await pdfDoc.embedPng(imageBytes);
                  page.drawImage(signatureImage, {
                    x: annotation.x,
                    y: annotation.y,
                    width: annotation.width || 150,
                    height: annotation.height || 50,
                  });
                } catch (error) {
                  console.error('Error embedding signature:', error);
                  // Fallback to text if image fails
                  page.drawText('Signature', {
                    x: annotation.x,
                    y: annotation.y,
                    size: 20,
                    color: rgb(0, 0, 0),
                  });
                }
              }
              break;
            
            case 'draw':
              if (annotation.paths) {
                // Convert paths to SVG path string
                const svgPath = annotation.paths.join(' ');
                page.drawSvgPath(svgPath, {
                  borderColor: rgb(0, 0, 0),
                  borderWidth: 2,
                });
              }
              break;
          }
        }

        const modifiedPdf = await pdfDoc.save();
        return modifiedPdf;
      } catch (error) {
        console.error('Error saving PDF:', error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  const downloadPdf = useCallback((pdfBytes: Uint8Array, filename: string) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
    isSaving,
    savePdfWithAnnotations,
    downloadPdf,
  };
};