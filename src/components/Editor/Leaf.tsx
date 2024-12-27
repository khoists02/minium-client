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

interface LeafProps {
  attributes: any;
  children: React.ReactElement | React.ReactElement[];
  leaf: any;
}

export const Leaf: FC<LeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.highlight) {
    children = (
      <span
        style={{
          backgroundColor: "#4ec94e",
          color: "#333333",
        }}
      >
        {children}
      </span>
    );
  }

  if (leaf.link) {
    children = (
      <a className="link" href={leaf.link}>
        {children}
      </a>
    );
  }
  return <span {...attributes}>{children}</span>;
};
