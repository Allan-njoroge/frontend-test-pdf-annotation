"use client";

import { useEffect, useRef, useState } from "react";

type DrawingToolProps = {
  isActive: boolean;
  color: string;
  onDraw: (paths: { x: number; y: number }[][]) => void;
};

export const DrawingTool = ({ isActive, color, onDraw }: DrawingToolProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isActive]);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    paths.forEach((path) => {
      if (path.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
    });
  }, [paths, color, isActive]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setPaths((prev) => [
        ...prev,
        [{ x: e.clientX - rect.left, y: e.clientY - rect.top }],
      ]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !isActive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setPaths((prev) => {
        const lastPath = prev[prev.length - 1];
        const updatedLastPath = [
          ...lastPath,
          { x: e.clientX - rect.left, y: e.clientY - rect.top },
        ];
        return [...prev.slice(0, -1), updatedLastPath];
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    onDraw(paths);
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 ${isActive ? "block" : "hidden"}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};