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
import React from "react";
import { useSlate } from "slate-react";
import { Transforms, Text } from "slate";

interface ToolbarButtonProps {
  format: string;
  icon: React.ReactElement | React.ReactElement[] | string;
  className?: string;
  onClick?: () => void;
  isLeaf?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ format, icon, className, onClick, isLeaf = false }) => {
  const editor = useSlate();

  return (
    <button
      className={`btn btn-light} ${className}`}
      onClick={onClick}
      onMouseDown={() => {
        if (!isLeaf) return;
        Transforms.setNodes(
          editor,
          { [format]: true },
          { match: (n) => Text.isText(n), split: true }
        );
      }}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;