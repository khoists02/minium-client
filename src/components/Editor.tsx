import React, { useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import ToolbarButton from "./Editor/ToolbarButton";

const SlateEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      placeholder: "Title",
      children: [{
        text: "",
      }]
    }
  ]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
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
        {/* <div style={{ borderBottom: "1px solid #ccc", padding: "5px" }}>
          <ToolbarButton format="bold" icon="B" />
          <ToolbarButton format="italic" icon="I" />
          <ToolbarButton format="underline" icon="U" />
        </div> */}
        <Editable
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
  const isEmpty = element.children[0]?.text === "";
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
    default:
      return <p {...attributes}>{children}</p>;
  }
};


export default SlateEditor;