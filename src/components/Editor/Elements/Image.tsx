import React, { FC, useState } from "react";
import { ImageElement } from "../../../types/slate";

interface ImageProps {
  readonly?: boolean;
  attributes?: any;
  isEmpty?: boolean;
  element?: ImageElement;
  children?: any;
  focused?: boolean;
}

export const Image: FC<ImageProps> = ({
  readonly,
  attributes,
  isEmpty,
  element,
  children,
  focused = false,
}) => {
  const [clicked, setClicked] = useState(false);
  return <div {...attributes} contentEditable={!readonly}>
    {!readonly && (focused || clicked) && <div contentEditable={false} className="text-center w-100 mb-3">
      <button className="btn btn-light">Full</button>
      <button className="btn btn-light ml-2 mr-2">Fit</button>
      <button className="btn btn-light">Small</button>
    </div>}
    <img
      onFocus={() => {
        setClicked(true);
      }}
      onClick={() => {
        setClicked(true);
      }}
      onBlur={() => {
        setClicked(false);
      }}
      src={element.url}
      alt={element.alt}
      style={{ maxWidth: "100%", height: "auto", display: "block" }}
    />
    {children}
  </div>
}