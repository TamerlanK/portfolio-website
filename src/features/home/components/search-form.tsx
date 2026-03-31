"use client";

import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

interface SearchFormProps {
  onSubmit: (query: string) => void;
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = input.trim();
    if (!query) return;

    onSubmit(query);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div
        className="
          flex items-center gap-2 rounded-2xl border border-neutral-700
          bg-neutral-800/30 px-4 py-3 shadow-none backdrop-blur-lg
          transition-all

          hover:border-neutral-600 hover:bg-neutral-700/30

          focus-within:border-neutral-500
          focus-within:bg-neutral-700/30
          focus-within:ring-1 focus-within:ring-neutral-500/40
        "
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          className="min-w-0 flex-1 border-none bg-transparent text-base text-neutral-200 placeholder:text-neutral-500 outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Submit question"
          className="
            flex h-10 w-10 items-center justify-center rounded-xl
            border border-neutral-700 bg-neutral-800/40 text-neutral-200
            transition-all

            hover:border-neutral-600 hover:bg-neutral-700/30
            active:scale-95

            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
