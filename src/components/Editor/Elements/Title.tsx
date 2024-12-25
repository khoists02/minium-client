import React, { FC } from "react";
import { TitleElement } from "../../../types/slate";

interface TitleProps {
  readonly?: boolean;
  attributes?: any;
  isEmpty?: boolean;
  element?: TitleElement;
  children?: any;
}

export const Title: FC<TitleProps> = ({
  readonly,
  attributes,
  isEmpty,
  element,
  children,
}) => {
  return <h3 contentEditable={!readonly} {...attributes} style={{ position: "relative" }}>
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
}