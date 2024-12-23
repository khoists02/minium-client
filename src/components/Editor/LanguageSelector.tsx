import React from "react";
import { Editor, Transforms } from "slate";

// Language Selector Component
export const LanguageSelector = ({ editor }) => {
  const languages = ["javascript", "python", "java", "html", "css", "plaintext"];

  const handleChange = (event) => {
    const language = event.target.value;

    // Update the language property of the selected code block
    //  @ts-ignore
    const [match] = Editor.nodes(editor, {
      //  @ts-ignore
      match: (n) => n.type === "code-block",
    });

    if (match) {
      Transforms.setNodes(
        editor,
        // @ts-ignore
        { language },
        // @ts-ignore
        { match: (n) => n.type === "code-block" }
      );
    }
  };

  return (
    <select contentEditable={false} onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Select Language
      </option>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
