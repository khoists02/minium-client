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
import { Editor, Transforms, Text } from "slate";

// Helper function to toggle mark
export const toggleMark = (editor: Editor, mark: string) => {
  const isActive = isMarkActive(editor, mark);
  if (isActive) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
};

// Helper function to check if mark is active
export const isMarkActive = (editor: Editor, mark: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[mark] === true : false;
};

/**
 * return value to present focussed block.
 * @param editor
 * @param blockType
 * @param id
 * @returns
 */
export const isBlockFocused = (editor, blockType, id) => {
  if (!editor.selection) return false; // No selection means no block is focused
  // @ts-ignore
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      // @ts-ignore
      return n.type === blockType && n.id === id;
    },
  });

  return !!match; // Returns true if a block of the given type is focused
};

export const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => Text.isText(n) && n[format as keyof Text] === true,
      universal: true,
    })
  );
  return !!match;
};

export const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? false : true },
    { match: (n) => Text.isText(n), split: true }
  );
};
