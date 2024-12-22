import { useSlate } from "slate-react";
import { toggleMark } from "./helpers";
import React, { FC } from "react";

// Render a button to toggle highlight
export const HighlightButton: FC = () => {
  const editor = useSlate();
  return (
    <button
      className="btn btn-primary"
      onMouseDown={(event) => {
        event.preventDefault(); // Prevent default behavior to not blur the editor
        toggleMark(editor, "highlight");
      }}
    >
      <i className="fa fa-thumb-tack"></i>
    </button>
  );
};