import React, { FC } from "react";
import { CustomElement } from "../../types/slate";
import { useSlate } from "slate-react";
import { WrapperElement } from "./Elements/WrapperElement";
import { isBlockFocused } from "./helpers";
import { CodeBlock } from "./Elements/CodeBlock";
import { LanguageSelector } from "./LanguageSelector";
import { Paragraph } from "./Elements/Paragraph";
import { Quote } from "./Elements/Quote";
import { Title } from "./Elements/Title";
import { Image } from "./Elements/Image";

interface ElementProps {
  attributes: any;
  children: React.ReactElement | React.ReactElement[];
  element: CustomElement,
  onSelect: (format: string) => void;
  readonly: boolean;
}

export const Element: FC<ElementProps> = ({
  attributes,
  element,
  children,
  onSelect,
  readonly,
}) => {
  const editor = useSlate();
  const isEmpty = element.children[0]?.text === "";
  const isCurrentBlockFocused = isBlockFocused(editor, element.type, element.id);
  switch (element.type) {
    case "paragraph":
      return (
        <WrapperElement onSelect={onSelect} isEmpty={isEmpty} id={element.id} focused={isCurrentBlockFocused}>
          <Paragraph isEmpty={isEmpty} readonly={readonly} element={element} children={children} attributes={attributes} />
        </WrapperElement>

      );
    case "quote":
      return (
        <Quote isEmpty={isEmpty} readonly={readonly} element={element} children={children} attributes={attributes} />
      );
    case "image":
      return (
        <Image readonly={readonly} attributes={attributes} children={children} element={element} focused={isCurrentBlockFocused} />
      );
    case "code-block":
      return (
        <WrapperElement onSelect={onSelect} type={element.type} isEmpty={isEmpty} id={element.id} focused={isCurrentBlockFocused}>
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
          {isCurrentBlockFocused && !readonly && <LanguageSelector editor={editor} />}

          <CodeBlock readonly={readonly} attributes={attributes} children={children} element={element} />
        </WrapperElement>

      );
    case "title":
      return (
        <WrapperElement onSelect={onSelect} type={element.type} isEmpty={isEmpty} id={element.id} focused={isCurrentBlockFocused}>
          <Title readonly={readonly} attributes={attributes} children={children} element={element} />
        </WrapperElement>

      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}
