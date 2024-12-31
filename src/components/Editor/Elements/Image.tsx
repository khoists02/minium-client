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
import React, { CSSProperties, FC, useMemo, useState } from "react";
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

  const showBorder = useMemo(
    () => (focused || clicked) && !readonly,
    [readonly, clicked, focused],
  );
  const imageStyles = useMemo((): CSSProperties => {
    return {
      maxWidth: "100%",
      height: "auto",
      display: "block",
      border: showBorder ? "3px solid green" : "",
    };
  }, [showBorder]);

  return (
    <div {...attributes} contentEditable={!readonly}>
      {!readonly && clicked && (
        <div contentEditable={false} className="text-center w-100 mb-3">
          <button className="btn btn-success ">Full</button>
          <button className="btn btn-success  ms-2 me-2">Fit</button>
          <button className="btn btn-success ">Small</button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => {
              if (onDelete) onDelete();
            }}
          >
            <i className="fa fa-trash text-white"></i>
          </button>
        </div>
      )}
      <img
        onClick={() => {
          if (!readonly) setClicked(true);
        }}
        contentEditable={false}
        src={element.url}
        alt={element.alt}
        style={imageStyles}
      />
      {children}
    </div>
  );
};
