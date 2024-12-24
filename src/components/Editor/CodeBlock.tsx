import React, { useEffect } from "react";


// Optionally, import a Prism theme
import "prismjs/themes/prism.css"; // Default theme
export const CodeBlock = ({ attributes, children, element, readonly }) => {
  const language = element.language || "plaintext";
  const className = `language-${language}`;

  return (
    <pre contentEditable={!readonly} {...attributes} style={{ background: "#f5f5f5", padding: "10px" }}>
      <code data-language={language}>{children}</code>
    </pre>
  );
};