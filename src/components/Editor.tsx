import React, { useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Transforms, Range } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { v4 as uuidv4 } from "uuid";
import { CustomElement } from "../types/slate";
import { Element } from "./Editor/Element";
import { Leaf } from "./Editor/Leaf";
import { toggleMark } from "./Editor/helpers";
import ToolbarButton from "./Editor/ToolbarButton";
import Toolbar from "./Editor/Toolbar";

const SlateEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      id: uuidv4(),
      type: "title",
      placeholder: "Title...",
      children: [{
        text: "",
      }]
    },
    {
      id: uuidv4(),
      type: "paragraph",
      placeholder: "Tell your story...",
      children: [{
        text: "",
      }]
    }
  ]);

  const handleAddNewElement = () => {
    const newUuid = uuidv4();
    const newParagraph: CustomElement = {
      type: "paragraph",
      id: newUuid,
      placeholder: "Add new your story...",
      children: [{ text: "" }],
    };

    // Insert new paragraph with the UUID
    Transforms.insertNodes(editor, newParagraph);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // GENERATE NEW UUID.
      handleAddNewElement();
    }


    if (event.ctrlKey) {
      switch (event.key) {
        case "z": // Undo
          event.preventDefault();
          editor.undo();
          break;
        case "y": // Redo
          event.preventDefault();
          editor.redo();
          break;
      }
    }

    if (event.ctrlKey && event.key === "a") {
      // Ctrl + A to select all text
      event.preventDefault();
      const range = Editor.range(editor, [0, 0]); // Range that covers the whole document
      Transforms.select(editor, range);
    }

    if (event.ctrlKey && event.key === "Backspace") {
      // Ctrl + Backspace (Delete) to delete selected content
      event.preventDefault();
      if (!Range.isCollapsed(editor.selection)) {
        // Delete selected content if there is a selection
        Transforms.delete(editor);
      } else {
        // Otherwise, remove the previous word
        Transforms.delete(editor, { unit: "word", reverse: true });
      }
    }

    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      toggleMark(editor, "highlight");
    }
  };

  return (
    <div>

      <Slate editor={editor} initialValue={value} onChange={(newValue) => {
        setValue(newValue);
      }}>
        <Editable
          className="editor-editable"
          onKeyDown={handleKeyDown}
          renderElement={(props) => <Element {...props} />}
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Slate>
    </div>
  );
};



export default SlateEditor;