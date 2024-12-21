import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

// Define custom types for your blocks
type CustomElement =
    | { type: "paragraph"; children: CustomText[], placeholder?: string, id: string }
    | { type: "quote"; children: CustomText[], placeholder?: string, id: string }
    | { type: "image", url: string, alt: string, children: CustomText[], id: string }
    | { type: "code", children: CustomText[], id: string }

type CustomText = { text: string; bold?: boolean; italic?: boolean, code?: boolean; };

// Extend the Slate editor type
type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}