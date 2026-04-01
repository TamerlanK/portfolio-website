import { MarkdownNode } from "./markdown.types";

export function parseMarkdown(input: string): MarkdownNode[] {
  const lines = input.split("\n");
  const nodes: MarkdownNode[] = [];

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Code block ```
    if (line.startsWith("```")) {
      let code = "";
      i++;

      while (i < lines.length && !lines[i].startsWith("```")) {
        code += lines[i] + "\n";
        i++;
      }

      nodes.push({
        type: "code_block",
        content: code.trim(),
      });

      i++;
      continue;
    }

    // ── Heading
    if (line.startsWith("#")) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const content = line.replace(/^#+\s*/, "");

      nodes.push({
        type: "heading",
        level,
        content,
      });

      i++;
      continue;
    }

    // ── List (- item)
    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""));
        i++;
      }

      nodes.push({
        type: "list",
        items,
      });

      continue;
    }

    // ── Paragraph (multi-line)
    if (line.trim() !== "") {
      let paragraph = "";

      while (i < lines.length && lines[i].trim() !== "") {
        paragraph += lines[i] + "\n";
        i++;
      }

      nodes.push({
        type: "paragraph",
        content: paragraph.trim(),
      });

      continue;
    }

    i++;
  }

  return nodes;
}
