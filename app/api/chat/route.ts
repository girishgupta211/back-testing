import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Ensure we have messages to send
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Simple response logic based on keywords
    const lastMessage = messages[messages.length - 1]
    const userInput = lastMessage.content.toLowerCase()

    let responseContent = ""

    if (userInput.includes("kyc") || userInput.includes("compliance")) {
      responseContent =
        "I can help you with KYC compliance. Would you like me to check the status of your clients' KYC documents or generate compliance reports?"
    } else if (userInput.includes("portfolio") || userInput.includes("investment")) {
      responseContent =
        "I can analyze portfolio performance and suggest optimization strategies. Would you like me to review a specific client's portfolio or provide general investment recommendations?"
    } else if (userInput.includes("marketing") || userInput.includes("campaign")) {
      responseContent =
        "I can help create marketing content for your advisory practice. Would you like me to draft social media posts, email campaigns, or client newsletters?"
    } else if (userInput.includes("report") || userInput.includes("generate")) {
      responseContent =
        "I can generate various reports for your practice. What type of report would you like me to create? Options include client performance reports, commission reports, or business metrics."
    } else {
      responseContent =
        "I'm here to help with your financial advisory practice. You can ask me about client management, portfolio analysis, compliance requirements, marketing strategies, or report generation."
    }

    // Simulate a delay to make the response feel more natural
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      role: "assistant",
      content: responseContent,
    })
  } catch (error: any) {
    console.error("Error in chat API route:", error)
    return new Response(JSON.stringify({ error: error.message || "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
