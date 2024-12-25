import React, { useEffect } from "react";

export const CodeBlock = ({ attributes, children, element, readonly }) => {
  const language = element.language || "plaintext";

  return (
    <pre contentEditable={!readonly} {...attributes} style={{ background: "#f5f5f5", padding: "10px" }}>
      <code data-language={language}>{children}</code>
    </pre>
  );
};