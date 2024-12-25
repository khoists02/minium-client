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
import { CustomElement } from "../../types/slate";
import { ReactEditor, useSlate } from "slate-react";
import { WrapperElement } from "./Elements/WrapperElement";
import { isBlockFocused } from "./helpers";
import { CodeBlock } from "./Elements/CodeBlock";
import { LanguageSelector } from "./LanguageSelector";
import { Paragraph } from "./Elements/Paragraph";
import { Quote } from "./Elements/Quote";
import { Title } from "./Elements/Title";
import { Image } from "./Elements/Image";
import { HeaderEl } from "./Elements/HeaderEl";
import { Transforms } from "slate";

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
        <Image onDelete={() => {
          // Remove node.
          const path = ReactEditor.findPath(editor, element);
          // @ts-ignore
          Transforms.removeNodes(editor, { at: path });
        }}
          readonly={readonly}
          attributes={attributes}
          children={children}
          element={element}
          focused={isCurrentBlockFocused} />
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
    case "header":
      return (
        <WrapperElement onSelect={onSelect} type={element.type} isEmpty={isEmpty} id={element.id} focused={isCurrentBlockFocused}>
          <HeaderEl readonly={readonly} attributes={attributes} children={children} element={element} />
        </WrapperElement>

      );
    case "break":
      return (
        <>
          <div style={{ width: "100%", height: 1, background: "#000000" }}>

          </div>
          {children}
        </>

      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}
