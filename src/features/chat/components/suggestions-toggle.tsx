import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SuggestionsToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function SuggestionsToggle({
  isVisible,
  onToggle,
}: SuggestionsToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-1.5 text-[11px] font-medium tracking-wider",
        "text-neutral-500 transition-colors hover:text-neutral-300",
        "mb-2 ml-1 mx-auto"
      )}
    >
      {isVisible ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
      {isVisible ? "Hide Suggestions" : "Show Suggestions"}
    </button>
  );
}
