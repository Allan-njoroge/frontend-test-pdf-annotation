import { JSX } from "react";

export type EditorToolsType = {
  name: string;
  icon: JSX.Element;
  value: string;
};

export type ColorType = {
  name: string;
  hex: string;
};

export type MenuToggleType = {
  menuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // setMenuOpen?: (open: boolean) => void
};

export type ToolbarType = MenuToggleType & {
  numPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export type AnnotationType = {
  // paths: any;
  // imageData(imageData: any): unknown;
  id: string;
  type: "highlight" | "draw" | "signature" | "comment";
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  text?: string;
  page: number;
  imageData?: string; // base64 string for signatures
  paths?: string[]; // for drawing paths
};

export type Tool =
  | "select"
  | "highlight"
  | "draw"
  | "signature"
  | "comment"
  | "erase";
