import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type ParagraphElement = { type: "paragraph"; children: CustomText[], placeholder?: string, id: string; placeholder?: string, };
export type QuoteElement = { type: "quote"; children: CustomText[], placeholder?: string, id: string };
export type ImageElement = { type: "image", url: string, alt: string, children: CustomText[], id: string };
export type CodeElement = { type: "code-block", children: CustomText[], id: string, language: "javascript", placeholder?: string };
export type TitleElement = { type: "title", placeholder?: string, children: CustomText[], id: string };

// Define custom types for your blocks
export type CustomElement =
    | ParagraphElement
    | QuoteElement
    | ImageElement
    | CodeElement
    | TitleElement;

export type CustomText = { text: string; bold?: boolean; italic?: boolean; small?: boolean; highlight?: boolean; underline?: boolean };

// Extend the Slate editor type
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}