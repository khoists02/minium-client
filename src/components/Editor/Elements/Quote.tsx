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