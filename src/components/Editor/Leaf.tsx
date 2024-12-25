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
    children = <span style={{ backgroundColor: "#92d892", fontWeight: 500, color: "#ffffff" }}>{children}</span>;
  }

  if (leaf.link) {
    children = <a className="link" href={leaf.link}>{children}</a>;
  }
  return <span {...attributes}>{children}</span>;
};