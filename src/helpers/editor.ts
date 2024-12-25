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
import { Node } from "slate";

// Define an HTML-to-Slate conversion function
export const deserialize = (html: string): Node[] => {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  const transform = (el: HTMLElement): any => {
    switch (el.nodeName) {
      case "BODY":
        return Array.from(el.childNodes).map(transform);
      case "P":
        return {
          type: "paragraph",
          children: [{ text: el.textContent || "" }],
        };
      case "STRONG":
        return {
          type: "bold",
          children: [{ text: el.textContent || "" }],
        };
      case "EM":
        return {
          type: "italic",
          children: [{ text: el.textContent || "" }],
        };
      case "CODE":
        return {
          type: "code",
          children: [{ text: el.textContent || "" }],
        };
      default:
        return { text: el.textContent || "" };
    }
  };

  return transform(document.body) as Node[];
};
