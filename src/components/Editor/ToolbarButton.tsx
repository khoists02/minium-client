import React from "react";
import { Editor, Transforms, Text } from "slate";
import { useSlate } from "slate-react";

interface ToolbarButtonProps {
  format: string;
  icon: string; // Replace with an actual icon or text for simplicity.
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ format, icon }) => {
  const editor = useSlate();

  const isActive = isFormatActive(editor, format);

  return (
    <button
      style={{
        fontWeight: isActive ? "bold" : "normal",
        margin: "0 5px",
        cursor: "pointer",
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      {icon}
    </button>
  );
};

const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => Text.isText(n) && n[format as keyof Text] === true,
      universal: true,
    })
  );
  return !!match;
};

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? undefined : true },
    { match: (n) => Text.isText(n), split: true }
  );
};

export default ToolbarButton;