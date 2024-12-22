import React from "react";
import { useSlate } from "slate-react";
import { isFormatActive, toggleFormat } from "./helpers";

interface ToolbarButtonProps {
  format: string;
  icon: React.ReactElement | React.ReactElement[] | string;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ format, icon, className }) => {
  const editor = useSlate();

  const isActive = isFormatActive(editor, format);

  return (
    <button
      className={`btn btn-${isActive ? "primary" : "light"} ${className}`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;