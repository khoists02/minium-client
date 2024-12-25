import React, { FC } from "react";
import { ParagraphElement } from "../../../types/slate";

interface ParagraphProps {
  readonly?: boolean;
  attributes?: any;
  isEmpty?: boolean;
  element?: ParagraphElement;
  children?: any;
}

export const Paragraph: FC<ParagraphProps> = ({
  readonly,
  attributes,
  isEmpty,
  element,
  children,
}) => {
  return <p contentEditable={!readonly} {...attributes} style={{ position: "relative" }}>
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
        {element?.placeholder}
      </span>
    )}
    {children}
  </p>
}