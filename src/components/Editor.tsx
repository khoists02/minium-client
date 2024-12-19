import React, { useState } from "react";
import ReactQuill from "react-quill"; // Import the Quill editor
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

// Define the type for the editor's value
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange = (content: string) => {
    onChange(content); // Pass the updated content to the parent component
  };

  return (
    <div className="editor-container">
      <ReactQuill  value={value} onChange={handleChange} />
    </div>
  );
};

export default Editor;