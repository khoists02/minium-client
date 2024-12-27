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
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
  placeholder?: string;
  id: string;
  placeholder?: string;
};
export type DescriptionElement = {
  type: "description";
  children: CustomText[];
  placeholder?: string;
  id: string;
  placeholder?: string;
};
export type QuoteElement = {
  type: "quote";
  children: CustomText[];
  placeholder?: string;
  id: string;
};
export type ImageElement = {
  type: "image";
  url: string;
  alt: string;
  children: CustomText[];
  id: string;
};
export type CodeElement = {
  type: "code-block";
  children: CustomText[];
  id: string;
  language: "javascript";
  placeholder?: string;
};
export type TitleElement = {
  type: "title";
  placeholder?: string;
  children: CustomText[];
  id: string;
};
export type HeaderElement = {
  type: "header";
  placeholder?: string;
  children: CustomText[];
  id: string;
};
export type BreakLine = {
  type: "break";
  placeholder?: string;
  children: CustomText[];
  id: string;
};
// Define custom types for your blocks
export type CustomElement =
  | ParagraphElement
  | QuoteElement
  | ImageElement
  | CodeElement
  | TitleElement
  | DescriptionElement
  | HeaderElement
  | BreakLine;

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  small?: boolean;
  highlight?: boolean;
  underline?: boolean;
  link?: boolean;
};

// Extend the Slate editor type
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
