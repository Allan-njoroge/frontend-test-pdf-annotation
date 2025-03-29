"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { MdCheck, MdClose, MdRefresh } from "react-icons/md";

type SignatureToolProps = {
  onSave: (signatureData: string) => void;
  onClose: () => void;
};

export const SignatureTool = ({ onSave, onClose }: SignatureToolProps) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    sigCanvasRef.current?.clear();
  };

  const handleSave = () => {
    const signatureData = sigCanvasRef.current?.toDataURL(); // as base64
    if (signatureData) {
      onSave(signatureData);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Add Signature</h3>
        <div className="border border-gray-300 rounded">
          <SignatureCanvas
            ref={sigCanvasRef}
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: "w-full h-48 bg-white",
            }}
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <MdRefresh size={18} />
            Clear
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <MdClose size={18} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <MdCheck size={18} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};