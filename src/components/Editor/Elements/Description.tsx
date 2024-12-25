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
import { DescriptionElement } from "../../../types/slate";

interface DescriptionProps {
  readonly?: boolean;
  attributes?: any;
  isEmpty?: boolean;
  element?: DescriptionElement;
  children?: any;
}

export const Description: FC<DescriptionProps> = ({
  readonly,
  attributes,
  isEmpty,
  element,
  children,
}) => {
  return <h5 contentEditable={!readonly} {...attributes} style={{ position: "relative", color: "#6B6B6B" }}>
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
  </h5>
}