import React, { FC, useMemo } from "react";
import Toolbar from "../Toolbar";

interface WrapperElementProps {
  children: React.ReactElement | React.ReactElement[];
  isEmpty: boolean;
  focused?: boolean;
  id?: string;
  type?: string;
  onSelect: (format: string) => void;
}

export const WrapperElement: FC<WrapperElementProps> = (
  {
    children,
    isEmpty,
    focused,
    id,
    type = "",
    onSelect,
  }
) => {
  const isShowAddSidebar = useMemo(() => focused && isEmpty, [focused, isEmpty])
  return <div data-id={id} data-focused={focused} className="editor-item">
    {isShowAddSidebar && <Toolbar onSelect={onSelect} wrapperClass={`add-new ${type}`} />}
    {children}
  </div>
}