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
import React, { useEffect } from "react";

export const CodeBlock = ({ attributes, children, element, readonly }) => {
  const language = element.language || "plaintext";

  return (
    <pre contentEditable={!readonly} {...attributes} style={{ background: "#f5f5f5", padding: "10px" }}>
      <code data-language={language}>{children}</code>
    </pre>
  );
};