import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Descendant, Editor, Transforms, Range } from "slate";
import { Slate, Editable, withReact, } from "slate-react";
import { withHistory } from "slate-history";
import { v4 as uuidv4 } from "uuid";
import { CustomElement } from "../../types/slate";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { toggleFormat, toggleMark } from "./helpers";
import { Overlay, Tooltip } from "react-bootstrap";
import axios from "axios";

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
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipTarget = useRef();

  const handleDoubleClick = (event: React.MouseEvent) => {
    if (readonly) return;
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.trim()) {
      setTooltipText(`Selected: "${selectedText}"`);
      // @ts-ignore
      const rect = event.target.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2,
      });
      // @ts-ignore
      tooltipTarget.current = event.target;
      setTooltipVisible(true);
    } else {
      setTooltipVisible(false);
    }
  };

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      if (readonly) return;
      event.preventDefault();
      const text = event.clipboardData.getData("text/plain").trim();

      // Insert the pasted text into the current block
      Transforms.insertText(editor, text);
    },
    [editor]
  );

  const handleAddNewElement = () => {
    if (readonly) return;
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
    if (readonly) return;
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

    // ctrl keys events.
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

    // delete event
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
      // // Simulate upload and get a URL (replace with your upload logic)
      // const url = URL.createObjectURL(file);

      const fd = new FormData();
      fd.append("postImage", file);
      fd.append("fieldname", uuidv4())

      try {
        const rs = await axios.post("/posts/upload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        insertImage(editor, rs.data.imgUrl, file.name);
      } catch (error) {

      }

      // Insert the image into the editor
    }
  };


  const handleSelect = (fmt: string) => {
    if (readonly) return;
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
    if (readonly) return;
    toggleFormat(editor, fmt);
  }

  return (
    <Slate editor={editor} initialValue={initValue} onChange={(newValue) => {
      setValue(newValue);
    }}>
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
      <Overlay
        target={tooltipTarget.current}
        show={tooltipVisible}
        placement="top"
        rootClose
        onHide={() => setTooltipVisible(false)}
      >
        <Tooltip id="slate-tooltip">
          <i contentEditable={false} className="fa fa-bold text-success cursor-pointer" onClick={() => handleFormatClick("bold")}></i>
          <i contentEditable={false} className="fa fa-italic text-success cursor-pointer ml-2" onClick={() => handleFormatClick("italic")}></i>
          <i contentEditable={false} className="fa fa-link text-success cursor-pointer ml-2" onClick={() => handleFormatClick("link")}></i>
        </Tooltip>
      </Overlay>

    </Slate>

  );
};



export default SlateEditor;