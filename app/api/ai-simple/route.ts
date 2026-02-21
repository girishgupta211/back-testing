import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    // Get the user's message
    const userMessage = messages[messages.length - 1].content

    // Generate a simple response based on the user's message
    let response = "I'm not sure how to respond to that. Try asking about your portfolio, clients, or business metrics."

    // Check for keywords in the user's message
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("market") || lowerMessage.includes("stock") || lowerMessage.includes("investment")) {
      response = `
# Market Analysis

Based on current market conditions, here are some key points to consider:

1. **Market Volatility**: The markets have shown increased volatility in recent weeks
2. **Sector Performance**: Technology and healthcare sectors continue to outperform
3. **Interest Rates**: Central banks are maintaining cautious stance on interest rates
4. **Global Factors**: International trade tensions are affecting market sentiment

For your clients, I recommend focusing on diversified portfolios with a mix of growth and defensive assets.
      `
    } else if (lowerMessage.includes("fund") || lowerMessage.includes("mutual fund")) {
      response = `
# Fund Recommendations

Here are some fund categories that are performing well:

1. **Large Cap Funds**: Providing stability in uncertain markets
2. **Flexi Cap Funds**: Offering flexibility across market capitalizations
3. **Debt Funds**: Good for risk-averse clients seeking steady returns
4. **Index Funds**: Low-cost options for market exposure

Consider recommending these based on your clients' risk profiles and investment horizons.
      `
    } else if (lowerMessage.includes("client") || lowerMessage.includes("portfolio")) {
      response = `
# Client Portfolio Insights

Your client portfolios show these trends:

1. **Equity Allocation**: Average of 62% across all clients
2. **Debt Exposure**: 28% allocation, slightly below recommended levels
3. **Alternative Investments**: 10% allocation, primarily in gold and REITs
4. **Risk Distribution**: 45% moderate risk, 30% aggressive, 25% conservative

Consider rebalancing portfolios that have drifted from their target allocations.
      `
    }

    return NextResponse.json({
      role: "assistant",
      content: response,
    })
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
