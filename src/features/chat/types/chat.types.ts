import { ResponseImage } from "@/features/chat/lib/chat-config";
import { Message } from "@/features/chat/lib/chat-store";

export interface MessageBubbleProps {
  message: Message;
  streamText?: string | null;
  isStreaming?: boolean;
}

export interface MessageListProps {
  messages: Message[];
  streamingId: string | null;
  streamText: string | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isThinking: boolean;
}

export interface MessageContentProps {
  message: Message;
  streamText?: string | null;
}

export interface AvatarProps {
  src: string;
  alt?: string;
  isThinking?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface ResponseImagesProps {
  images: ResponseImage[];
}

export interface InlineSuggestionsProps {
  disabled?: boolean;
}

export interface SuggestionChipProps {
  label: string;
  query: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  placeholder?: string;
}

export interface SendButtonProps {
  disabled: boolean;
  onClick?: () => void;
}

export interface TypingIndicatorProps {
  dotCount?: number;
  className?: string;
}

export interface StreamingCursorProps {
  className?: string;
}
