import React from "react";
import { useSlate } from "slate-react";
import { isFormatActive, toggleFormat } from "./helpers";

interface ToolbarButtonProps {
  format: string;
  icon: React.ReactElement | React.ReactElement[] | string
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ format, icon }) => {
  const editor = useSlate();

  const isActive = isFormatActive(editor, format);

  return (
    <button
      className={`btn btn-${isActive ? "primary" : "light"}`}
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