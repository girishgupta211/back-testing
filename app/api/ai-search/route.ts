import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Hardcoded API key as a fallback (not recommended for production)
const FALLBACK_API_KEY = "sk-placeholder-key-for-testing-purposes-only"

export async function POST(request: NextRequest) {
  try {
    // Check environment variables first
    let apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.error("Missing OPENAI_API_KEY environment variable, using fallback key")
      apiKey = FALLBACK_API_KEY
    }

    // Parse request body
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    // Create system message
    const systemMessage = {
      role: "system",
      content: `You are ZinniAI, a financial advisor assistant. 
      You have access to the most up-to-date information about financial markets, investment strategies, and wealth management.
      When answering questions, provide accurate, helpful information for financial advisors.
      Format your responses in a clear, concise manner using markdown formatting.
      Use bullet points, headings, and other markdown features to make your responses easy to read.
      When providing market data or financial advice, mention that this information is based on your knowledge.`,
    }

    const messagesWithSystem = [systemMessage, ...messages]

    // Make direct fetch call to OpenAI API instead of using SDK
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Start with this model
        messages: messagesWithSystem,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenAI API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })

      return NextResponse.json(
        {
          role: "assistant",
          content: `I'm having trouble connecting to my knowledge base. Let me help you with information about your portfolio data instead. Try asking about your AUM, clients at risk, or upcoming meetings.`,
        },
        { status: 200 },
      )
    }

    // Parse successful response
    const data = await response.json()

    if (!data.choices || data.choices.length === 0) {
      console.error("No choices in OpenAI response:", data)
      return NextResponse.json(
        {
          role: "assistant",
          content:
            "I couldn't generate a response for that query. Let me help you with information about your portfolio data instead.",
        },
        { status: 200 },
      )
    }

    const assistantMessage = data.choices[0].message

    return NextResponse.json(assistantMessage)
  } catch (error: any) {
    console.error("API Route Error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

    return NextResponse.json(
      {
        role: "assistant",
        content:
          "I encountered an error while processing your request. Please try asking about your portfolio data instead.",
      },
      { status: 200 },
    )
  }
}
