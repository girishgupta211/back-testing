export interface InsightCategory {
  id: string
  name: string
  description: string
}

export interface Insight {
  id: string
  title: string
  summary: string
  category: string
  date: string
  author: string
  content: string
  tags: string[]
  isNew?: boolean
}

export const insightCategories: InsightCategory[] = [
  {
    id: "market-outlook",
    name: "Market Outlook",
    description: "Analysis of market trends and future outlook",
  },
  {
    id: "investment-strategy",
    name: "Investment Strategy",
    description: "Strategic approaches to portfolio construction",
  },
  {
    id: "fund-analysis",
    name: "Fund Analysis",
    description: "Detailed analysis of mutual funds and other investment products",
  },
  {
    id: "stock-analysis",
    name: "Stock Analysis",
    description: "Research and analysis of individual stocks",
  },
  {
    id: "fixed-income",
    name: "Fixed Income",
    description: "Insights on bonds, deposits, and other fixed income instruments",
  },
  {
    id: "alternative-investments",
    name: "Alternative Investments",
    description: "Research on PMS, AIF, REITs, and other alternative investments",
  },
]

export const insights: Insight[] = [
  {
    id: "insight-1",
    title: "Mid & Small Cap Outlook 2023-24",
    summary: "Analysis of growth opportunities in the mid and small cap segment",
    category: "market-outlook",
    date: "2023-05-15",
    author: "Rahul Sharma",
    content: `
      # Mid & Small Cap Outlook 2023-24
      
      The mid and small cap segment of the Indian equity market has shown remarkable resilience and growth potential in recent years. Despite periods of volatility, these segments have consistently outperformed large caps over longer time horizons.
      
      ## Current Valuation Metrics
      
      As of May 2023, the valuation metrics for mid and small caps present an interesting picture:
      
      - Nifty Midcap 150 P/E: 28.5x (5-year average: 26.2x)
      - Nifty Smallcap 250 P/E: 22.8x (5-year average: 19.5x)
      
      While these valuations are slightly above historical averages, they need to be viewed in the context of improving earnings growth and return on equity.
      
      ## Growth Drivers
      
      Several factors are likely to drive growth in the mid and small cap segment over the next 12-18 months:
      
      1. **Domestic Consumption Revival**: Post-pandemic recovery in consumer spending
      2. **Manufacturing Push**: Government initiatives like PLI scheme benefiting manufacturing companies
      3. **Credit Growth**: Improved balance sheets of banks leading to higher credit disbursement
      4. **Capex Cycle**: Early signs of private capex revival benefiting industrial and capital goods companies
      5. **Supply Chain Diversification**: Global companies looking at India as an alternative to China
      
      ## Sector Opportunities
      
      Based on our analysis, the following sectors within the mid and small cap space offer attractive opportunities:
      
      - **Capital Goods & Engineering**: Beneficiaries of capex cycle and infrastructure push
      - **Specialty Chemicals**: Import substitution and export opportunities
      - **Auto Ancillaries**: Recovery in auto sales and EV transition
      - **Financial Services (ex-banks)**: Insurance, wealth management, and fintech
      - **Healthcare**: Domestic formulations and API manufacturers
      
      ## Investment Approach
      
      Given the higher volatility in this segment, we recommend:
      
      1. A staggered investment approach through SIPs or STPs
      2. A minimum investment horizon of 5+ years
      3. Focus on companies with strong balance sheets and cash flows
      4. Preference for market leaders in niche segments
      5. Avoiding companies with high promoter pledging or governance concerns
      
      ## Risks to Watch
      
      While the outlook is positive, investors should be mindful of:
      
      - Global liquidity tightening and its impact on FII flows
      - Persistent inflation affecting margins
      - Valuation froth in certain pockets
      - Regulatory changes affecting specific sectors
      
      ## Conclusion
      
      The mid and small cap segment offers significant growth potential for long-term investors. However, selectivity is key, and a disciplined investment approach focusing on quality businesses at reasonable valuations will be crucial for generating superior risk-adjusted returns.
    `,
    tags: ["mid cap", "small cap", "equity", "market outlook"],
    isNew: true,
  },
  {
    id: "insight-2",
    title: "Fixed Income Strategy in Rising Rate Environment",
    summary: "How to position your debt portfolio in the current interest rate cycle",
    category: "fixed-income",
    date: "2023-05-10",
    author: "Priya Mehta",
    content: `
      # Fixed Income Strategy in Rising Rate Environment
      
      The interest rate cycle in India appears to be nearing its peak, with the RBI having raised rates significantly to combat inflation. This presents both challenges and opportunities for fixed income investors.
      
      ## Current Yield Curve
      
      The yield curve has shifted upward across tenures:
      
      - Overnight: 6.50%
      - 1-Year: 7.15%
      - 3-Year: 7.35%
      - 5-Year: 7.45%
      - 10-Year: 7.25%
      
      The relatively flat yield curve suggests that the market expects rates to stabilize in the medium term.
      
      ## Strategy Recommendations
      
      ### 1. Laddered Bond Portfolio
      
      A laddered approach with equal allocation across different maturities (1-5 years) can help balance yield and interest rate risk. As shorter-term bonds mature, they can be reinvested at potentially higher rates.
      
      ### 2. Floating Rate Instruments
      
      Floating rate bonds and funds can benefit from rising rates as their coupons reset periodically. Consider allocating 20-30% of the debt portfolio to floating rate instruments.
      
      ### 3. Target Maturity Funds
      
      These funds invest in bonds with similar maturity dates, providing visibility on returns if held till maturity. They offer better tax efficiency compared to direct bonds for retail investors.
      
      ### 4. Credit Opportunities
      
      With corporate balance sheets improving, selective exposure to AA-rated corporate bonds can enhance portfolio yield. However, maintain a quality bias and avoid excessive credit risk.
      
      ### 5. Short Duration Strategy
      
      For investors with low risk appetite, maintaining a portfolio duration of 1-3 years can help minimize interest rate risk while capturing current yields.
      
      ## Recommended Allocation
      
      Based on our analysis, we recommend the following allocation for a moderate risk investor:
      
      - Target Maturity Funds (3-5 years): 30%
      - Short Duration Funds: 25%
      - Corporate Bond Funds: 20%
      - Floating Rate Funds: 15%
      - Liquid/Money Market Funds: 10%
      
      ## Outlook
      
      We expect the rate hiking cycle to pause in the next 1-2 quarters, followed by a potential gradual easing cycle starting in late 2023 or early 2024. This suggests that locking in current yields for medium-term investments could be beneficial.
      
      ## Conclusion
      
      The current interest rate environment offers attractive opportunities for fixed income investors. A well-diversified approach across maturities and credit qualities, with a bias towards high-quality issuers, should help investors navigate the evolving interest rate landscape.
    `,
    tags: ["fixed income", "bonds", "interest rates", "debt funds"],
  },
  {
    id: "insight-3",
    title: "PMS vs Mutual Funds: A Comparative Analysis",
    summary: "Which investment vehicle is right for your portfolio?",
    category: "investment-strategy",
    date: "2023-05-05",
    author: "Vikram Singh",
    content: `
      # PMS vs Mutual Funds: A Comparative Analysis
      
      Portfolio Management Services (PMS) and Mutual Funds are two popular investment vehicles in India. While both offer professional management of investments, they differ significantly in structure, approach, and suitability.
      
      ## Key Differences
      
      ### 1. Minimum Investment
      
      - **Mutual Funds**: As low as ₹500 for SIPs, ₹5,000 for lump sum
      - **PMS**: Minimum ₹50 lakhs as per SEBI regulations
      
      ### 2. Portfolio Construction
      
      - **Mutual Funds**: Pooled investment vehicle with same portfolio for all investors
      - **PMS**: Segregated portfolio for each investor, allowing customization
      
      ### 3. Fee Structure
      
      - **Mutual Funds**: Expense ratio (1.5-2.5% for equity funds) includes all costs
      - **PMS**: Fixed fee (1.5-2.5%) plus performance fee (typically 10-20% of profits above a hurdle rate)
      
      ### 4. Transparency
      
      - **Mutual Funds**: Portfolio disclosure monthly/quarterly, NAV daily
      - **PMS**: Detailed portfolio and transaction statements for individual holdings
      
      ### 5. Taxation
      
      - **Mutual Funds**: Tax on fund level events (dividend distribution, redemption)
      - **PMS**: Tax on individual security transactions, allowing for tax-loss harvesting
      
      ### 6. Investment Approach
      
      - **Mutual Funds**: Diversified approach with regulatory limits on concentration
      - **PMS**: Can take concentrated positions, more flexibility in strategy
      
      ## Performance Analysis
      
      Our analysis of 20 leading PMS strategies versus comparable mutual funds over the last 5 years shows:
      
      - Top quartile PMS strategies outperformed comparable mutual funds by 3-5% annually
      - Bottom quartile PMS strategies underperformed comparable mutual funds by 2-4% annually
      - Higher dispersion of returns in PMS compared to mutual funds
      
      This highlights the importance of manager selection in PMS investing.
      
      ## Suitability Assessment
      
      ### Mutual Funds are more suitable for:
      
      - First-time investors
      - Investors with less than ₹50 lakhs to invest in equities
      - Those preferring simplicity and lower costs
      - Investors seeking diversification across multiple asset classes
      - Those uncomfortable with higher volatility
      
      ### PMS is more suitable for:
      
      - High Net Worth Individuals with over ₹50 lakhs to invest
      - Experienced investors seeking customization
      - Those looking for potentially higher returns through concentrated strategies
      - Investors seeking tax efficiency through direct equity ownership
      - Those comfortable with higher volatility and potential drawdowns
      
      ## Conclusion
      
      The choice between mutual funds and PMS should be based on investment amount, experience, customization needs, and risk appetite. Many sophisticated investors use both vehicles - mutual funds for broad market exposure and asset allocation, and PMS for specialized strategies or sectors.
      
      For investors qualifying for both, a hybrid approach often works best, with core allocation to mutual funds and satellite allocation to specialized PMS strategies.
    `,
    tags: ["PMS", "mutual funds", "portfolio management", "investment strategy"],
  },
]
