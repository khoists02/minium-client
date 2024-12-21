import React, { FC, useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Transforms } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { withHistory } from "slate-history";
import { v4 as uuidv4 } from "uuid";
import { CustomElement } from "../types/slate";

const SlateEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [id, setId] = useState(uuidv4());
  const [value, setValue] = useState<Descendant[]>([
    {
      id: id,
      type: "paragraph",
      placeholder: "Title",
      children: [{
        text: "",
      }]
    }
  ]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newUuid = uuidv4();
      const newParagraph: CustomElement = {
        type: "paragraph",
        id: newUuid,
        children: [{ text: "" }],
      };

      // Insert new paragraph with the UUID
      Transforms.insertNodes(editor, newParagraph);
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
  };

  return (
    <div>

      <Slate editor={editor} initialValue={value} onChange={(newValue) => {
        setValue(newValue);
      }}>
        <Editable
          style={{
            outline: "none", // Remove focus outline
            border: "none",  // Remove border
            padding: "0",    // Optional: Adjust padding if necessary
            boxShadow: "none", // Remove box shadow if any
          }}
          onKeyDown={handleKeyDown}
          renderElement={(props) => <Element {...props} />}
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Slate>
    </div>
  );
};

const Leaf: React.FC<{ attributes: any; children: any; leaf: any }> = ({
  attributes,
  children,
  leaf,
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element: React.FC<{ attributes: any; children: any; element: any }> = ({
  attributes,
  children,
  element,
}) => {
  const editor = useSlate();
  const isEmpty = element.children[0]?.text === "";
  const isCurrentBlockFocused = isBlockFocused(editor, element.type, element.id);
  switch (element.type) {
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "paragraph":
      return (
        <WrapperElement isEmpty={isEmpty} id={element.id} focused={isCurrentBlockFocused}>
          <p {...attributes} style={{ position: "relative" }}>
            {isEmpty && (
              <span
                contentEditable={false}
                style={{
                  position: "absolute",
                  pointerEvents: "none",
                  opacity: 0.5,
                  userSelect: "none",
                }}
              >
                {element.placeholder}
              </span>
            )}
            {children}
          </p>
        </WrapperElement>

      );
    case "quote":
      return (
        <blockquote
          {...attributes}
          style={{
            position: "relative",
            borderLeft: "4px solid #ccc",
            paddingLeft: "10px",
            color: "#555",
            fontStyle: "italic",
          }}
        >
          {isEmpty && (
            <span
              contentEditable={false}
              style={{
                position: "absolute",
                pointerEvents: "none",
                opacity: 0.5,
                userSelect: "none",
              }}
            >
              {element.placeholder}
            </span>
          )}
          {children}
        </blockquote>
      );
    case "image":
      return (
        <div {...attributes} contentEditable={false}>
          <img
            src={element.url}
            alt={element.alt}
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
          />
          {children}
        </div>
      );
    case "code":
      return (
        <pre
          {...attributes}
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "monospace",
            overflowX: "auto",
          }}
        >
          <code>{children}</code>
        </pre>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const WrapperElement: FC<{ children: any; isEmpty: boolean; focused?: boolean; id?: string }> = ({ children, isEmpty, focused, id }) => {
  const isShowAddSidebar = useMemo(() => focused && isEmpty, [focused, isEmpty])
  return <div data-id={id} data-focused={focused} className="editor-item">
    {isShowAddSidebar && <div className="add-new">+</div>}
    {children}
  </div>
}

/**
 * return value to present focussed block.
 * @param editor 
 * @param blockType 
 * @param id 
 * @returns 
 */
const isBlockFocused = (editor, blockType, id) => {
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


export default SlateEditor;