import type React from "react"
declare module "ai" {
  export function OpenAIStream(response: any, options?: any): ReadableStream
  export class StreamingTextResponse extends Response {
    constructor(stream: ReadableStream, options?: any)
  }
}

declare module "ai/react" {
  export function useChat(options?: {
    api?: string
    initialMessages?: Array<{
      id: string
      role: "user" | "assistant" | "system"
      content: string
    }>
    onResponse?: (response: Response) => void
    onError?: (error: Error) => void
    onFinish?: (message: any) => void
  }): {
    messages: Array<{
      id: string
      role: "user" | "assistant" | "system"
      content: string
    }>
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
    append: (message: { role: "user" | "assistant" | "system"; content: string }) => void
  }
}
