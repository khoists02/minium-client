/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
import React, { useEffect, useMemo } from "react";

import Prism from "prismjs";

// Import Prism.js core, languages, and plugins
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; // Use your preferred theme
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";


export const CodeBlock = ({ attributes, children, element, readonly }) => {
  const language = element.language || "plaintext";
  const codeText = element.children.map((child) => child.text).join("\n");
  const highlightedCode = Prism.highlight(
    codeText,
    Prism.languages[language],
    language
  );
  return (
    <pre contentEditable={!readonly} {...attributes} style={{ position: "relative" }}>
      {/* Render Prism.js highlighting */}
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          opacity: 1,
          userSelect: "text",
        }}
      />
      {readonly ? <div
        style={{
          position: "relative",
          background: "transparent",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          visibility: readonly ? "hidden" : "visible",
        }}
      >
        {codeText}
      </div> : <div
        style={{
          position: "relative",
          background: "transparent",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          opacity: 0,
        }}
      >
        {children}
      </div>}

    </pre>
  );
};