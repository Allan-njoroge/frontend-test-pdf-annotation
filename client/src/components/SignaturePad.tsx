import CanvasDraw from "react-canvas-draw";
import { useState } from "react";
import { useAnnotations } from "@/context/annotationContext";

const SignaturePad = () => {
  const { addAnnotation } = useAnnotations();
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);

  const handleSaveSignature = () => {
    if (canvasRef) {
      const imageData = canvasRef.getDataURL();
      addAnnotation({ type: "signature", imageData, x: 100, y: 100, page: 1 });
    }
  };

  return (
    <div>
      <CanvasDraw ref={(canvas: any) => setCanvasRef(canvas)} brushRadius={2} brushColor="#000" />
      <button onClick={handleSaveSignature} className="mt-2 p-2 bg-blue-500 text-white">Save Signature</button>
    </div>
  );
};

export default SignaturePad;
