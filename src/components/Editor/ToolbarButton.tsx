import React from "react";
import { useSlate } from "slate-react";
import { Transforms, Text } from "slate";

interface ToolbarButtonProps {
  format: string;
  icon: React.ReactElement | React.ReactElement[] | string;
  className?: string;
  onClick?: () => void;
  isLeaf?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ format, icon, className, onClick, isLeaf = false }) => {
  const editor = useSlate();

  return (
    <button
      className={`btn btn-light} ${className}`}
      onClick={onClick}
      onMouseDown={() => {
        if (!isLeaf) return;
        Transforms.setNodes(
          editor,
          { [format]: true },
          { match: (n) => Text.isText(n), split: true }
        );
      }}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;