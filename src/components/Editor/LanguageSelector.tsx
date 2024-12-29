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
import { useSlateStatic } from "slate-react";

// Language Selector Component
export const LanguageSelector = ({ lang }) => {
  const editor = useSlateStatic();
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
        { match: (n) => n.type === "code-block" },
      );
    }
  };

  return (
    <select
      data-test-id="language-select"
      contentEditable={false}
      onChange={handleChange}
      value={lang}
      style={{
        position: "absolute",
        right: 5,
        top: -30,
        zIndex: 1,
      }}
    >
      <option value="css">CSS</option>
      <option value="javascript">JavaScript</option>
    </select>
  );
};
