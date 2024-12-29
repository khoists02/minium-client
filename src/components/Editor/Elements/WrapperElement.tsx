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
import React, { FC, useMemo } from "react";
import Toolbar from "../Toolbar";
import { ElementType } from "../../../constants";

interface WrapperElementProps {
  children: React.ReactElement | React.ReactElement[];
  isEmpty: boolean;
  focused?: boolean;
  id?: string;
  type?: string;
  onSelect: (format: string) => void;
}

export const WrapperElement: FC<WrapperElementProps> = ({
  children,
  isEmpty,
  focused,
  id,
  type = "",
  onSelect,
}) => {
  const toolbarElements = useMemo(() => {
    return [
      ElementType.IMAGE,
      ElementType.CODE,
      ElementType.QUOTE,
      ElementType.HEADER,
      ElementType.DESCRIPTION,
      ElementType.BREAK,
    ];
  }, []);

  const isShowAddSidebar = useMemo(
    () => focused && isEmpty,
    [focused, isEmpty],
  );
  return (
    <div data-id={id} data-focused={focused} className="editor-item">
      {isShowAddSidebar && (
        <Toolbar
          toolbarElements={toolbarElements}
          onSelect={onSelect}
          wrapperClass={`add-new ${type}`}
        />
      )}
      {children}
    </div>
  );
};
