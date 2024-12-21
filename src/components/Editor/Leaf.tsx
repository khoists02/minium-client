import React, { FC } from "react";

interface LeafProps {
  attributes: any;
  children: React.ReactElement | React.ReactElement[];
  leaf: any;
}

export const Leaf: FC<LeafProps> = ({
  attributes,
  children,
  leaf,
}) => {
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
    children = <span style={{ backgroundColor: "yellow" }}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};