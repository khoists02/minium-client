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
