"use client";

import { LuHighlighter, LuPencil } from "react-icons/lu";
import { AiOutlineSignature } from "react-icons/ai";
import { CiEraser } from "react-icons/ci";
import { CgMenuRight } from "react-icons/cg";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type EditorToolsType = {
  name: string;
  icon: React.ReactNode;
  value: string;
};

type ColorType = {
  name: string;
  hex: string;
};

type ToolbarType = {
  numPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedTool: string | null;
  onToolSelect: (tool: string | null) => void;
  onClearAnnotations: () => void;
  onShowSignaturePad: () => void;
  onExport: () => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

const Toolbar = ({
  numPages,
  currentPage,
  setCurrentPage,
  selectedTool,
  onToolSelect,
  onClearAnnotations,
  onShowSignaturePad,
  onExport,
  selectedColor,
  onColorSelect,
}: ToolbarType) => {
  const editorTools: EditorToolsType[] = [
    { name: "Highlight", icon: <LuHighlighter />, value: "highlight" },
    { name: "Draw", icon: <LuPencil />, value: "draw" },
    { name: "Sign", icon: <AiOutlineSignature />, value: "sign" },
  ];

  const colors: ColorType[] = [
    { name: "red", hex: "#FF000080" },
    { name: "yellow", hex: "#FFFF0080" },
    { name: "green", hex: "#00800080" },
    { name: "blue", hex: "#0000FF80" },
    { name: "gray", hex: "#80808080" },
    { name: "orange", hex: "#FFA50080" },
  ];

  return (
    <div className="flex items-center px-5 py-3 bg-gray-200 justify-between sticky top-0 z-10">
      <div className="flex gap-3 md:gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2">
              <CgMenuRight className="rotate-180 lg:text-xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background">
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {editorTools.map((item, i) => (
              <DropdownMenuItem
                key={i}
                onClick={() => onToolSelect(item.value)}
                className={`hover:bg-gray-100 ${selectedTool === item.value ? "bg-gray-200" : ""}`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onShowSignaturePad}>
              <span className="mr-2"><AiOutlineSignature /></span>
              Add Signature
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedTool && ["highlight", "draw"].includes(selectedTool) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                />
                <RiArrowDropDownLine className="text-xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              <DropdownMenuLabel>Color Picker</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-3 gap-3 p-2">
                {colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => onColorSelect(color.hex)}
                    className="w-8 h-8 rounded-full border-2 border-transparent hover:border-gray-300"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button
          variant="outline"
          onClick={onClearAnnotations}
          disabled={!selectedTool}
        >
          <CiEraser className="mr-1" />
          Clear
        </Button>
      </div>

      <div className="flex items-center gap-1 w-full justify-center">
        <span>
          <Input
            value={currentPage}
            min={1}
            max={numPages}
            onChange={(e) => setCurrentPage(Math.min(Math.max(1, Number(e.target.value)), numPages))}
            className="focus:outline-none w-[50px] text-center"
          />
        </span>
        <span className="flex">of {numPages}</span>
      </div>

      <Button variant="secondary" onClick={onExport}>
        <MdOutlineFileDownload className="mr-1" />
        <span className="hidden md:inline">Export</span>
      </Button>
    </div>
  );
};

export default Toolbar;