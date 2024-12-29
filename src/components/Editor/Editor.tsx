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
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Range,
  Text,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { v4 as uuidv4 } from "uuid";
import { CustomElement, ImageElement } from "../../types/slate";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { addNewElement, toggleFormat, toggleMark } from "./helpers";
import axios from "axios";
import { CommentInBlock } from "./CommentInBlock";
import { IUserResponse } from "../../types/general";
import { ElementType } from "../../constants";
import { LeafTooltipContent } from "./Elements/LeafTooltipContent";

interface SlateEditorProps {
  onSave: (content: any) => void;
  initValue?: Descendant[];
  readonly?: boolean;
  author?: IUserResponse;
  onCommentSubmit?: (title: string, content: string) => void;
}

const SlateEditor: FC<SlateEditorProps> = ({
  onSave,
  onCommentSubmit,
  initValue = [],
  readonly = false,
  author,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const temporaryReadonly = useRef(false);
  const [value, setValue] = useState<Descendant[]>();
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipTarget = React.useRef<HTMLDivElement | null>(null);
  const [menu, setMenu] = useState<{
    text: string;
    show: boolean;
    visible: boolean;
    position: { x: number; y: number };
  }>({
    show: false,
    visible: false,
    position: { x: 0, y: 0 },
    text: "",
  });

  // handle show tooltip toolbar after select text
  const handleSelection = useCallback(
    (event) => {
      event.preventDefault();
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        setMenu({ ...menu, show: false, visible: false, text: "" });
        return;
      }

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width > 0 && domSelection.toString().trim()) {
        const pY = !readonly
          ? rect.top + window.scrollY - 125
          : rect.top + window.scrollY - 280;
        setMenu({
          show: true,
          text: domSelection.toString().trim(),
          visible: true,
          position: { x: rect.left + rect.width / 2 + window.scrollX, y: pY },
        });
      } else {
        setMenu({ ...menu, show: false, visible: false, text: "" });
      }
    },
    [editor, readonly],
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      const text = event.clipboardData.getData("text/plain").trim();
      // Insert the pasted text into the current block
      Transforms.insertText(editor, text);
    },
    [editor],
  );

  const handleAddNewElement = () => {
    if (readonly) return;
    const newParagraph: CustomElement = {
      type: ElementType.PARAGRAPH,
      id: uuidv4(),
      placeholder: "Add new your story...",
      children: [{ text: "" }],
    };
    // Insert new paragraph with the UUID
    addNewElement(editor, newParagraph);
  };

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

  // Add image node after upload.
  const addNewImageElement = (url: string, alt: string = "") => {
    const image: ImageElement = {
      type: ElementType.IMAGE,
      url,
      alt,
      children: [{ text: "" }],
      id: uuidv4(),
    };
    addNewElement(editor, image);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // // Simulate upload and get a URL (replace with your upload logic)

      const fd = new FormData();
      fd.append("postImage", file);
      fd.append("fieldname", uuidv4());

      try {
        const rs = await axios.post("/posts/upload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        addNewImageElement(rs.data.imgUrl, file.name);
      } catch (error) {
        console.log("Upload image err", error);
      }

      // Insert the image into the editor
    }
  };

  // toolbar select
  const handleSelect = (fmt: ElementType) => {
    if (readonly) return;
    if (fmt === ElementType.IMAGE) {
      // Handle insert image.
      inputRef.current.click();
    } else if (fmt === ElementType.CODE) {
      const item: CustomElement = {
        type: fmt as unknown as any,
        id: uuidv4(),
        language: "javascript",
        placeholder: "",
        children: [{ text: "" }],
      };
      addNewElement(editor, item);
    } else {
      const item: CustomElement = {
        type: fmt as unknown as any,
        id: uuidv4(),
        placeholder: "",
        children: [{ text: "" }],
      };
      addNewElement(editor, item);
    }
  };

  // toggle format text
  const handleFormatClick = (fmt: string) => {
    toggleFormat(editor, fmt);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipTarget.current &&
        !tooltipTarget.current.contains(event.target as Node)
      ) {
        setMenu({ ...menu, show: true, visible: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menu]);

  /**
   * Comment handles
   *
   */

  useEffect(() => {
    temporaryReadonly.current = readonly;
  }, [readonly]);

  const highlightText = () => {
    if (!editor.selection) return; // Ensure there's a selection

    Transforms.setNodes(
      editor,
      // @ts-ignore
      { highlight: true },
      { match: (node) => Text.isText(node), split: true },
    );
  };

  const handleCommentCancel = () => {
    setMenu({
      ...menu,
      visible: true,
      show: true,
    });

    toggleFormat(editor, "highlight");
  };

  // show menu tooltip content.
  const handleCommentClickBtn = () => {
    setMenu({
      ...menu,
      show: true,
      visible: false,
    });

    // temporaryReadonly.current = false;

    highlightText();

    // temporaryReadonly.current = readonly;
    // highlight text after tooltip open
  };

  const handleCommentSubmit = (title: string, content: string) => {
    setMenu({
      ...menu,
      visible: false,
      show: false,
    });
    if (onCommentSubmit) onCommentSubmit(title, content);

    // mark
    // toggleMark(editor, "highlight");
  };

  return (
    <div style={{ position: "relative" }}>
      <Slate
        editor={editor}
        initialValue={initValue}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          onChange={handleFileUpload}
          ref={inputRef}
        />
        <Editable
          readOnly={readonly ? temporaryReadonly.current : false}
          onSelect={(e) => {
            handleSelection(e);
          }}
          onPaste={handlePaste}
          onMouseUp={(e) => {
            handleSelection(e);
          }}
          className="editor-editable"
          onKeyDown={handleKeyDown}
          renderElement={(props) => (
            <Element
              readonly={readonly}
              onSelect={(fmt: ElementType) => {
                handleSelect(fmt);
              }}
              {...props}
            />
          )}
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Slate>
      {menu.show && (
        <div
          ref={tooltipTarget}
          className="menu-wrapper"
          style={{
            top: menu.position.y,
            left: menu.position.x,
            visibility: menu.visible ? "visible" : "hidden",
          }}
        >
          <div className="menu-inner">
            {!readonly && (
              <LeafTooltipContent handleFormatClick={handleFormatClick} />
            )}
            <CommentInBlock
              text={menu.text}
              author={author}
              onCancel={handleCommentCancel}
              onSubmit={handleCommentSubmit}
              onClick={() => {
                handleCommentClickBtn();
              }}
              icoClassName="cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SlateEditor;
