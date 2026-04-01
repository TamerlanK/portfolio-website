"use client";

import { parseMarkdown } from "./markdown-parser";
import { parseInline } from "./parse-inline";
import { JSX } from "react";

type Props = {
  content: string;
};

export function MarkdownRenderer({ content }: Props) {
  const nodes = parseMarkdown(content);

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {nodes.map((node, index) => {
        switch (node.type) {
          case "heading": {
            const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;

            return (
              <Tag key={index} className="font-bold text-lg">
                {parseInline(node.content)}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p key={index} className="whitespace-pre-wrap">
                {parseInline(node.content)}
              </p>
            );

          case "code_block":
            return (
              <pre
                key={index}
                className="bg-neutral-900 text-white p-3 rounded-lg overflow-x-auto"
              >
                <code>{node.content}</code>
              </pre>
            );

          case "list":
            return (
              <ul key={index} className="list-disc pl-5 space-y-1">
                {node.items.map((item, i) => (
                  <li key={i}>{parseInline(item)}</li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
