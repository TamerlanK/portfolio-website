import React from "react";

export function parseInline(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // ── Bold **text**
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);

    if (boldMatch && boldMatch.index !== undefined) {
      const [match, content] = boldMatch;

      if (boldMatch.index > 0) {
        elements.push(remaining.slice(0, boldMatch.index));
      }

      elements.push(
        <strong key={elements.length} className="font-semibold">
          {content}
        </strong>
      );

      remaining = remaining.slice(boldMatch.index + match.length);
      continue;
    }

    // ── Inline code `code`
    const codeMatch = remaining.match(/`(.*?)`/);

    if (codeMatch && codeMatch.index !== undefined) {
      const [match, content] = codeMatch;

      if (codeMatch.index > 0) {
        elements.push(remaining.slice(0, codeMatch.index));
      }

      elements.push(
        <code
          key={elements.length}
          className="bg-neutral-800 text-white px-1 py-0.5 rounded text-sm"
        >
          {content}
        </code>
      );

      remaining = remaining.slice(codeMatch.index + match.length);
      continue;
    }

    // ── Italic *text*
    const italicMatch = remaining.match(/\*(.*?)\*/);

    if (italicMatch && italicMatch.index !== undefined) {
      const [match, content] = italicMatch;

      if (italicMatch.index > 0) {
        elements.push(remaining.slice(0, italicMatch.index));
      }

      elements.push(
        <em key={elements.length} className="italic">
          {content}
        </em>
      );

      remaining = remaining.slice(italicMatch.index + match.length);
      continue;
    }

    // ── Links [text](url)
    const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);

    if (linkMatch && linkMatch.index !== undefined) {
      const [match, textContent, url] = linkMatch;

      if (linkMatch.index > 0) {
        elements.push(remaining.slice(0, linkMatch.index));
      }

      elements.push(
        <a
          key={elements.length}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:opacity-80"
        >
          {textContent}
        </a>
      );

      remaining = remaining.slice(linkMatch.index + match.length);
      continue;
    }

    // ── Fallback (plain text)
    elements.push(remaining);
    break;
  }

  return elements;
}
