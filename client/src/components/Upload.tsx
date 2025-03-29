"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { Button } from "./ui/button";

const Upload = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    setError(null); // Clear previous errors

    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors[0].code === "file-invalid-type") {
        setError("Only PDF files are accepted");
      } else if (rejection.errors[0].code === "too-many-files") {
        setError("Only one file can be uploaded at a time");
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile.type !== "application/pdf") {
        setError("File is not a PDF");
        return;
      }
      setFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    multiple: false,
    validator: (file) => {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        return { code: "file-too-large", message: "File is larger than 10MB" };
      }
      return null;
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`flex justify-center w-[90%] md:w-[50%] min-h-[50vh] items-center border-dashed border-2 mx-auto mt-20 rounded-lg hover:bg-primary/8 ${
          isDragActive ? "bg-primary/20 border-primary" : "border-primary"
        } ${error ? "border-destructive" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-5">
          {file ? (
            <div className="text-center">
              <h2 className="font-semibold text-xl mb-2">Selected file:</h2>
              <p className="text-primary">{file.name}</p>
              <p className="text-sm text-foreground/50 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-semibold text-2xl md:text-3xl">
                Upload PDF file here
              </h1>
              <MdOutlineFileUpload className="text-7xl" />
              <div className="text-center grid gap-2 w-full">
                <h3>
                  {isDragActive ? "Drop the PDF here" : "Drag & Drop PDF"}
                </h3>
                <h2 className="text-sm text-foreground/50">OR</h2>
                <div className="grid gap-3 w-full md:w-1/2 mx-auto">
                  <Button>Choose PDF File</Button>
                </div>
                {error && (
                  <p className="text-destructive text-sm mt-2">{error}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {file && (
        <div className="flex justify-center mt-4 gap-4">
          <Button onClick={() => onUpload(file)}>Process PDF</Button>
          <Button variant="destructive" onClick={() => setFile(null)}>
            Remove File
          </Button>
        </div>
      )}
    </div>
  );
};

export default Upload;