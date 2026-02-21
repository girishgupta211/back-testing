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
        "Based on my analysis, you have 5 clients with pending KYC updates. Would you like me to show you the list or generate reminder emails?"
    } else if (userInput.includes("portfolio") || userInput.includes("investment")) {
      responseContent =
        "I've analyzed your client portfolios and found 3 clients with significant asset allocation drift. Would you like to see the rebalancing opportunities?"
    } else if (userInput.includes("client") && userInput.includes("risk")) {
      responseContent =
        "I've identified 3 clients with portfolios that may be at risk due to recent market volatility. Would you like me to show you these clients and the specific risk factors?"
    } else if (userInput.includes("aum") || userInput.includes("business")) {
      responseContent =
        "Your current AUM is ₹43.2 Cr with a monthly SIP book of ₹85 Lakhs. Your business has grown 12.5% in the last quarter. Would you like to see a detailed breakdown?"
    } else {
      responseContent =
        "I'm your ZinniAI dashboard assistant. I can help you analyze client data, track business metrics, identify portfolio issues, and suggest optimization strategies. What would you like to know about today?"
    }

    // Simulate a delay to make the response feel more natural
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      role: "assistant",
      content: responseContent,
    })
  } catch (error: any) {
    console.error("Error in dashboard chat API route:", error)
    return new Response(JSON.stringify({ error: error.message || "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
