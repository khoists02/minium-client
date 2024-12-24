import React, { FC } from "react";
import { QuoteElement } from "../../../types/slate";

interface QuoteProps {
  readonly?: boolean;
  attributes?: any;
  isEmpty?: boolean;
  element?: QuoteElement;
  children?: any;
}

export const Quote: FC<QuoteProps> = ({
  readonly,
  attributes,
  isEmpty,
  element,
  children,
}) => {
  return <blockquote
    contentEditable={!readonly}
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
}