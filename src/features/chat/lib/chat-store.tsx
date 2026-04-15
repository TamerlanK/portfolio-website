"use client"

import {
  getResponse,
  type ResponseImage,
} from "@/features/chat/lib/chat-config"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react"

// ─── Types ──────────────────────────────────────────────────────────────────

type MessageStatus = "complete" | "thinking" | "streaming"
type ViewMode = "landing" | "chat"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  images?: ResponseImage[]
  status: MessageStatus
}

interface ChatState {
  mode: ViewMode
  messages: Message[]
  input: string
  streamingId: string | null
  streamText: string
  drawerOpen: boolean
  showSuggestions: boolean
}

// ─── Actions ────────────────────────────────────────────────────────────────

type ChatAction =
  | { type: "START_CHAT"; query: string; userId: string; assistantId: string }
  | { type: "SEND_MESSAGE"; query: string; userId: string; assistantId: string }
  | { type: "BEGIN_STREAMING"; assistantId: string }
  | { type: "UPDATE_STREAM"; text: string }
  | {
      type: "COMPLETE_STREAM"
      assistantId: string
      content: string
      images?: ResponseImage[]
    }
  | { type: "SET_INPUT"; value: string }
  | { type: "TOGGLE_SUGGESTIONS" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "GO_HOME" }

// ─── Reducer (pure — no side effects) ───────────────────────────────────────

const initialState: ChatState = {
  mode: "landing",
  messages: [],
  input: "",
  streamingId: null,
  streamText: "",
  drawerOpen: false,
  showSuggestions: true,
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "START_CHAT":
      return {
        ...state,
        mode: "chat",
        messages: [
          {
            id: action.userId,
            role: "user",
            content: action.query,
            status: "complete",
          },
          {
            id: action.assistantId,
            role: "assistant",
            content: "",
            status: "thinking",
          },
        ],
        streamingId: action.assistantId,
        streamText: "",
        input: "",
      }

    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: action.userId,
            role: "user",
            content: action.query,
            status: "complete",
          },
          {
            id: action.assistantId,
            role: "assistant",
            content: "",
            status: "thinking",
          },
        ],
        streamingId: action.assistantId,
        streamText: "",
        input: "",
      }

    case "BEGIN_STREAMING":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.assistantId
            ? { ...m, status: "streaming" as const }
            : m,
        ),
      }

    case "UPDATE_STREAM":
      return { ...state, streamText: action.text }

    case "COMPLETE_STREAM":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.assistantId
            ? {
                ...m,
                content: action.content,
                images: action.images,
                status: "complete" as const,
              }
            : m,
        ),
        streamingId: null,
        streamText: "",
      }

    case "SET_INPUT":
      return { ...state, input: action.value }

    case "TOGGLE_SUGGESTIONS":
      return { ...state, showSuggestions: !state.showSuggestions }

    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true }

    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false }

    case "GO_HOME":
      return {
        ...initialState,
        // Keep suggestions preference across resets
        showSuggestions: state.showSuggestions,
      }

    default:
      return state
  }
}

// ─── Context shape ──────────────────────────────────────────────────────────

interface ChatContextValue {
  // State
  state: ChatState

  // Derived
  isThinking: boolean

  // Actions — components call these, never dispatch directly
  startChat: (query: string) => void
  sendMessage: (query: string) => void
  setInput: (value: string) => void
  toggleSuggestions: () => void
  openDrawer: () => void
  closeDrawer: () => void
  goHome: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

// ─── Provider ───────────────────────────────────────────────────────────────
// Wraps the reducer with streaming side-effect logic.
// Timer management lives here — not in components.

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const timersRef = useRef<{
    timeout?: ReturnType<typeof setTimeout>
    interval?: ReturnType<typeof setInterval>
  }>({})

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timersRef.current.timeout)
      clearInterval(timersRef.current.interval)
    }
  }, [])

  // ── Streaming engine ──────────────────────────────────────────────────────
  const runStream = useCallback((assistantId: string, query: string) => {
    const response = getResponse(query)
    const fullText = response.text

    // Clear any previous stream
    clearTimeout(timersRef.current.timeout)
    clearInterval(timersRef.current.interval)

    // Phase 1: thinking (600ms)
    timersRef.current.timeout = setTimeout(() => {
      // Phase 2: begin streaming
      dispatch({ type: "BEGIN_STREAMING", assistantId })

      let i = 0
      timersRef.current.interval = setInterval(() => {
        if (i < fullText.length) {
          const chunk = Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1
          i = Math.min(i + chunk, fullText.length)
          dispatch({ type: "UPDATE_STREAM", text: fullText.slice(0, i) })
        } else {
          clearInterval(timersRef.current.interval)
          dispatch({
            type: "COMPLETE_STREAM",
            assistantId,
            content: fullText,
            images: response.images,
          })
        }
      }, 15)
    }, 600)
  }, [])

  // ── Public actions ────────────────────────────────────────────────────────

  const startChat = useCallback(
    (query: string) => {
      if (state.streamingId) return // prevent double-fire

      const userId = crypto.randomUUID()
      const assistantId = crypto.randomUUID()

      dispatch({ type: "START_CHAT", query, userId, assistantId })
      runStream(assistantId, query)
    },
    [state.streamingId, runStream],
  )

  const sendMessage = useCallback(
    (query: string) => {
      if (state.streamingId) return

      const userId = crypto.randomUUID()
      const assistantId = crypto.randomUUID()

      dispatch({ type: "SEND_MESSAGE", query, userId, assistantId })
      runStream(assistantId, query)
    },
    [state.streamingId, runStream],
  )

  const setInput = useCallback(
    (value: string) => dispatch({ type: "SET_INPUT", value }),
    [],
  )

  const toggleSuggestions = useCallback(
    () => dispatch({ type: "TOGGLE_SUGGESTIONS" }),
    [],
  )

  const openDrawer = useCallback(() => dispatch({ type: "OPEN_DRAWER" }), [])

  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [])

  const goHome = useCallback(() => {
    clearTimeout(timersRef.current.timeout)
    clearInterval(timersRef.current.interval)
    dispatch({ type: "GO_HOME" })
  }, [])

  const value: ChatContextValue = {
    state,
    isThinking: state.streamingId !== null,
    startChat,
    sendMessage,
    setInput,
    toggleSuggestions,
    openDrawer,
    closeDrawer,
    goHome,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error("useChat must be used within a <ChatProvider>")
  }
  return ctx
}
