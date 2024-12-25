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
