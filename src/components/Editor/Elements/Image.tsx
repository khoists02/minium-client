import React, { FC, useState } from "react";
import { ImageElement } from "../../../types/slate";

interface ImageProps {
  readonly?: boolean;
  attributes?: any;
  isEmpty?: boolean;
  element?: ImageElement;
  children?: any;
  focused?: boolean;
  onDelete?: () => void;
}

export const Image: FC<ImageProps> = ({
  readonly,
  attributes,
  isEmpty,
  element,
  children,
  focused = false,
  onDelete,
}) => {
  const [clicked, setClicked] = useState(false);
  return <div {...attributes} contentEditable={!readonly}>
    {!readonly && clicked && <div contentEditable={false} className="text-center w-100 mb-3">
      <button className="btn btn-success ">Full</button>
      <button className="btn btn-success  ml-2 mr-2">Fit</button>
      <button className="btn btn-success ">Small</button>
      <button className="btn btn-danger ml-2" onClick={() => {
        if (onDelete) onDelete();
      }}>
        <i className="fa fa-trash text-white"></i>
      </button>
    </div>}
    <img
      onClick={() => {
        if (!readonly) setClicked(true);
      }}
      contentEditable={false}
      src={element.url}
      alt={element.alt}
      style={{ maxWidth: "100%", height: "auto", display: "block", border: focused || clicked ? "3px solid green" : "" }}
    />
    {children}
  </div>
}