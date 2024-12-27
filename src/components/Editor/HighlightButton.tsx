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
import { useSlate } from "slate-react";
import { toggleMark } from "./helpers";
import React, { FC } from "react";

// Render a button to toggle highlight
export const HighlightButton: FC<{ className?: string }> = ({
  className = "",
}) => {
  const editor = useSlate();
  return (
    <button
      className={`btn btn-primary ${className}`}
      onMouseDown={(event) => {
        event.preventDefault(); // Prevent default behavior to not blur the editor
        toggleMark(editor, "highlight");
      }}
    >
      <i className="fa fa-thumb-tack"></i>
    </button>
  );
};
