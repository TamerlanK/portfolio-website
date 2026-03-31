import { cn } from "@/lib/utils";

interface MoreSuggestionsButtonProps {
  onClick: () => void;
}

export function MoreSuggestionsButton({ onClick }: MoreSuggestionsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs",
        "bg-transparent text-neutral-500 border border-dashed border-neutral-700/50",
        "transition-all duration-150",
        "hover:text-neutral-300 hover:border-neutral-600"
      )}
    >
      More…
    </button>
  );
}
