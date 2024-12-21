import React, { FC } from "react";
import { CustomElement } from "../../types/slate";
import { useSlate } from "slate-react";
import { WrapperElement } from "./WrapperElement";
import { isBlockFocused } from "./helpers";

interface ElementProps { attributes: any; children: React.ReactElement | React.ReactElement[]; element: CustomElement }

export const Element: FC<ElementProps> = ({
  attributes,
  element,
  children,
}) => {
  const editor = useSlate();
  const isEmpty = element.children[0]?.text === "";
  const isCurrentBlockFocused = isBlockFocused(editor, element.type, element.id);
  switch (element.type) {
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
    case "title":
      return (
        <WrapperElement type={element.type} isEmpty={isEmpty} id={element.id} focused={isCurrentBlockFocused}>
          <h3 {...attributes} style={{ position: "relative" }}>
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
          </h3>
        </WrapperElement>

      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}
