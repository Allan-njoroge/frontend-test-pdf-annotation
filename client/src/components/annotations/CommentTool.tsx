"use client";

import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";

type CommentToolProps = {
  position: { x: number; y: number };
  onSave: (text: string) => void;
  onClose: () => void;
};

export const CommentTool = ({ position, onSave, onClose }: CommentToolProps) => {
  const [comment, setComment] = useState<string>("");

  return (
    <div
      className="fixed bg-white p-2 shadow-lg rounded z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment..."
        className="border p-2 w-64 mb-2"
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <MdClose size={20} />
        </button>
        <button
          onClick={() => {
            if (comment.trim()) onSave(comment);
            onClose();
          }}
          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <MdCheck size={20} />
        </button>
      </div>
    </div>
  );
};