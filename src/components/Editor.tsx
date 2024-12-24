import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Descendant, Editor, Transforms, Range, Text } from "slate";
import { Slate, Editable, withReact, } from "slate-react";
import { withHistory } from "slate-history";
import { v4 as uuidv4 } from "uuid";
import { CustomElement } from "../types/slate";
import { Element } from "./Editor/Element";
import { Leaf } from "./Editor/Leaf";
import { isFormatActive, toggleFormat, toggleMark } from "./Editor/helpers";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";

interface SlateEditorProps {
  onSave: (content: any) => void;
  initValue?: Descendant[];
  readonly?: boolean;
}

const SlateEditor: FC<SlateEditorProps> = ({
  onSave,
  initValue = [],
  readonly = false,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleDoubleClick = () => {
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      // Show the tooltip and set the target element
      setTooltipTarget(event.target as HTMLElement);
      setShowTooltip(true);
    }
  };

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      const text = event.clipboardData.getData("text/plain").trim();

      // Insert the pasted text into the current block
      Transforms.insertText(editor, text);
    },
    [editor]
  );

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

    // Detect Cmd+S (macOS) or Ctrl+S (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === "s") {
      event.preventDefault(); // Prevent default browser save dialog
      onSave(value);
      return;
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
        case "s": // Save
          event.preventDefault();
          break;
      }
    }

    // Select all
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

  const insertImage = (editor: any, url: string, alt: string = "") => {
    const image = {
      type: "image",
      url,
      alt,
      children: [{ text: "" }], // Images must have an empty text node as children
    };
    Transforms.setNodes(editor, image as any);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload and get a URL (replace with your upload logic)
      const url = URL.createObjectURL(file);

      // Insert the image into the editor
      insertImage(editor, url, file.name);
    }
  };


  const handleSelect = (fmt: string) => {
    if (fmt !== "image") {
      const newUuid = uuidv4();
      const item: CustomElement = {
        type: fmt as unknown as any,
        id: newUuid,
        placeholder: "",
        children: [{ text: "" }],
      };

      // Insert new paragraph with the UUID
      Transforms.setNodes(editor, item as any);
    } else {
      // Handle insert image.
      inputRef.current.click();
    }
  }

  const handleFormatClick = (fmt: string) => {

    toggleFormat(editor, fmt);
    setTimeout(() => {
      setTooltipTarget(null);
    }, 1);
  }

  return (
    <div ref={overlayRef}>

      <Slate editor={editor} initialValue={initValue} onChange={(newValue) => {
        setValue(newValue);
      }}>
        {tooltipTarget && (
          <Overlay
            target={tooltipTarget}
            show={showTooltip}
            placement="top"
            container={overlayRef.current}
          >
            {(props) => (
              <Tooltip className="tooltip-format" id="tooltip" {...props} style={{ background: "transparent" }}>
                <i contentEditable={false} className="fa fa-bold text-success cursor-pointer" onClick={() => handleFormatClick("bold")}></i>
                <i contentEditable={false} className="fa fa-italic text-success cursor-pointer ml-2" onClick={() => handleFormatClick("italic")}></i>
                <i contentEditable={false} className="fa fa-link text-success cursor-pointer ml-2" onClick={() => handleFormatClick("link")}></i>
              </Tooltip>
            )}
          </Overlay>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          onChange={handleFileUpload}
          ref={inputRef}
        />
        <Editable

          disabled={readonly}
          contentEditable={!readonly}
          onDoubleClick={handleDoubleClick}
          onPaste={handlePaste}
          className="editor-editable"
          onKeyDown={handleKeyDown}
          renderElement={(props) => <Element readonly={readonly} onSelect={(fmt: string) => {
            handleSelect(fmt);
          }} {...props} />}
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Slate>
    </div>
  );
};



export default SlateEditor;