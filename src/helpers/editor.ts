import { Node } from "slate";
import parse from "html-react-parser";

// Define an HTML-to-Slate conversion function
export const deserialize = (html: string): Node[] => {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  const transform = (el: HTMLElement): any => {
    switch (el.nodeName) {
      case "BODY":
        return Array.from(el.childNodes).map(transform);
      case "P":
        return {
          type: "paragraph",
          children: [{ text: el.textContent || "" }],
        };
      case "STRONG":
        return {
          type: "bold",
          children: [{ text: el.textContent || "" }],
        };
      case "EM":
        return {
          type: "italic",
          children: [{ text: el.textContent || "" }],
        };
      case "CODE":
        return {
          type: "code",
          children: [{ text: el.textContent || "" }],
        };
      default:
        return { text: el.textContent || "" };
    }
  };

  return transform(document.body) as Node[];
};
