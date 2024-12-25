import React, { FC } from "react";
import { HeaderElement } from "../../../types/slate";

interface HeaderElProps {
  readonly?: boolean;
  attributes?: any;
  isEmpty?: boolean;
  element?: HeaderElement;
  children?: any;
}

export const HeaderEl: FC<HeaderElProps> = ({
  readonly,
  attributes,
  isEmpty,
  element,
  children,
}) => {
  return <h4 contentEditable={!readonly} {...attributes} style={{ position: "relative" }}>
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
  </h4>
}