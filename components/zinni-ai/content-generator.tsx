"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Sparkles, RefreshCw, Copy, Check, Linkedin, Instagram, Mail, MessageSquare, FileText } from "lucide-react"

export function ContentGenerator() {
  const [platform, setPlatform] = useState("linkedin")
  const [contentType, setContentType] = useState("post")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [contentLength, setContentLength] = useState("medium")

  // Sample content templates
  const contentTemplates = {
    linkedin: {
      post: {
        professional: `Market volatility: Friend or foe? 📈📉

In times of market uncertainty, it's natural to feel concerned about your investments. But remember, volatility creates opportunities for long-term investors.

At [Your Firm], we help clients navigate market fluctuations with disciplined investment strategies focused on long-term goals, not short-term noise.

Interested in stress-testing your portfolio? Let's connect for a complimentary review.

#InvestmentAdvice #MarketVolatility #FinancialPlanning`,
        conversational: `Anyone else feeling the market rollercoaster lately? 🎢

I've been getting calls from worried clients about the recent volatility, and here's what I'm telling them:

✅ Volatility is normal and expected
✅ Your financial plan was built for these moments
✅ Short-term noise rarely impacts long-term goals
✅ Sometimes the best action is no action

What's your approach to helping clients stay calm during market turbulence?

#FinancialAdvisor #MarketTips #InvestmentStrategy`,
      },
      article: {
        professional: `# 5 Tax-Efficient Investment Strategies for High-Income Professionals

As a financial advisor specializing in wealth management for high-income professionals, I've observed that tax efficiency often makes the difference between good and exceptional long-term returns.

## Why Tax Efficiency Matters

For high-income earners in the top tax brackets, taxes can erode up to 30-40% of investment returns if not properly managed. This makes tax-efficient investing not just beneficial but essential.

## Strategy 1: Maximize Tax-Advantaged Accounts

Before investing in taxable accounts, ensure you're fully utilizing tax-advantaged options:

- Employer retirement plans (EPF, NPS)
- Public Provident Fund (PPF)
- Equity Linked Savings Scheme (ELSS)

## Strategy 2: Strategic Asset Location

Place tax-inefficient investments (like debt funds) in tax-advantaged accounts, while keeping tax-efficient investments (like equity for long-term growth) in taxable accounts.

## Strategy 3: Tax-Loss Harvesting

Periodically review your portfolio for opportunities to offset capital gains with capital losses, reducing your overall tax liability.

## Strategy 4: Municipal Bonds and Tax-Free Instruments

Consider tax-free bonds for a portion of your fixed-income allocation, especially if you're in higher tax brackets.

## Strategy 5: Systematic Withdrawal Strategies

Develop a withdrawal strategy that minimizes tax impact during retirement by carefully managing which accounts you draw from and when.

Would you like to discuss how these strategies might apply to your specific situation? Contact me for a personalized consultation.

#TaxPlanning #WealthManagement #InvestmentStrategy`,
      },
    },
    instagram: {
      post: {
        professional: `📊 Smart investing doesn't have to be complicated!

Start your wealth creation journey today with as little as ₹500 per month.

Swipe to learn how systematic investment plans can help you achieve your financial goals! 👉

#WealthCreation #SIP #MutualFunds #FinancialFreedom`,
        conversational: `Ever feel like investing is speaking a language you don't understand? 🤔

You're not alone! That's why I break down complex financial concepts into bite-sized pieces.

Today's simplified concept: Compound interest - the 8th wonder of the world! ✨

Tap the link in bio to learn how compound interest can turn small, consistent investments into significant wealth over time!

#InvestingSimplified #FinancialLiteracy #CompoundInterest #WealthBuilding`,
      },
      carousel: {
        professional: `Slide 1: 5 Myths About Mutual Fund Investing 🧠 #FinancialEducation

Slide 2: Myth #1: "You need a lot of money to start investing" ❌
Reality: Start with as little as ₹500 per month through SIPs

Slide 3: Myth #2: "Equity funds are too risky for beginners" ❌
Reality: Risk depends on investment horizon and fund selection

Slide 4: Myth #3: "Past performance guarantees future returns" ❌
Reality: Markets evolve; diversification matters more than chasing returns

Slide 5: Myth #4: "All mutual funds are the same" ❌
Reality: Different funds serve different goals and risk profiles

Slide 6: Myth #5: "DIY investing saves money" ❌
Reality: Professional guidance often leads to better long-term outcomes

Slide 7: Ready to start your investment journey? Let's connect! 📱 [Contact details]

#MutualFunds #InvestmentMyths #FinancialPlanning #WealthCreation`,
      },
    },
    email: {
      newsletter: {
        professional: `Subject: Monthly Market Insights: Navigating Volatility with Confidence

Dear [Client Name],

I hope this email finds you well. As we navigate through a period of market volatility, I wanted to share some insights and perspectives that might help you maintain confidence in your long-term financial plan.

## Market Overview

The past month has seen increased volatility due to [specific market events]. While headlines may cause concern, it's important to remember that market fluctuations are a normal part of the investment cycle.

## Portfolio Implications

Your diversified portfolio was designed with these market realities in mind. Here's how different asset classes in your portfolio have performed:

- Equity: [Brief performance note]
- Debt: [Brief performance note]
- Alternative investments: [Brief performance note]

## Opportunity Spotlight

The current market environment has created potential opportunities in [specific sector/asset class]. For clients with appropriate risk profiles, we're considering tactical allocations to these areas.

## Regulatory Update

The recent [regulatory change] may impact certain investment strategies. We're proactively reviewing all client portfolios to ensure alignment with these changes.

## Educational Corner: Understanding Market Corrections

Market corrections (defined as a 10%+ decline) occur on average once per year. Historically, markets have recovered and reached new highs after corrections, rewarding patient investors.

Would you like to discuss how these insights apply to your specific financial situation? Feel free to schedule a review meeting using the link below.

[Schedule Meeting Button]

Warm regards,
[Your Name]
[Your Designation]
[Contact Information]`,
      },
      welcome: {
        professional: `Subject: Welcome to Your Financial Journey with [Your Firm]

Dear [Client Name],

It's my pleasure to officially welcome you to [Your Firm]. I'm honored that you've chosen us as your partner on your financial journey, and I'm committed to helping you achieve your financial goals.

## Next Steps

1. **Review Your Welcome Kit**: You should receive your welcome kit within 3-5 business days. It contains important information about our services and how to access your account.

2. **Schedule Your Strategy Session**: Let's meet to dive deeper into your financial goals and develop a personalized investment strategy. [Booking Link]

3. **Set Up Your Client Portal**: Access your investments 24/7 through our secure client portal. [Setup Instructions]

## What to Expect

As your financial advisor, I'll provide:

- Quarterly portfolio reviews
- Regular market updates and insights
- Proactive tax planning recommendations
- Annual comprehensive financial plan updates

## Educational Resources

To help you make informed financial decisions, I've attached our "Investment Basics" guide. This resource covers fundamental concepts that will serve as a foundation for our discussions.

## Questions?

If you have any questions before our strategy session, please don't hesitate to reach out. I'm here to ensure your experience is seamless and your questions are answered promptly.

I look forward to our partnership and helping you achieve financial confidence.

Warm regards,

[Your Name]
[Your Designation]
[Contact Information]

P.S. Follow us on [Social Media Links] for daily financial tips and market insights.`,
      },
    },
    whatsapp: {
      message: {
        professional: `Hello [Client Name],

I hope this message finds you well. I wanted to bring to your attention a time-sensitive investment opportunity that aligns with your financial goals:

*New Fund Offer: [Fund Name]*
• Category: [Fund Category]
• Investment Focus: [Brief description]
• Minimum Investment: ₹5,000
• NFO Period: [Start Date] to [End Date]

Based on your investment profile and goals, this fund could be a good addition to your portfolio because:
1. It complements your existing investments
2. It provides exposure to [specific sector/theme]
3. The fund management team has a strong track record

Would you like to schedule a quick 15-minute call to discuss this opportunity in more detail?

Best regards,
[Your Name]`,
        conversational: `Hi [Client Name]! 👋

Hope you're having a great week! Just wanted to give you a quick heads-up about something that might interest you.

There's a new NFO (New Fund Offer) from [AMC Name] that looks promising for your portfolio goals! 📈

It's a [Fund Category] fund focusing on [Brief description]. The minimum investment is just ₹5,000 and the offer is open until [End Date].

I think it could be a good fit for you because it aligns with your [specific financial goal] we discussed.

Would you be free for a quick 10-min call tomorrow to chat about it? I can explain the details better over the phone! 📱

Cheers,
[Your Name]`,
      },
    },
  }

  const handleGenerateContent = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Get the appropriate template based on selections
      const content = contentTemplates[platform]?.[contentType]?.[tone] || "Content not available for this combination."
      setGeneratedContent(content)
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getPlatformIcon = () => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0496ff]" /> AI Content Generator
          </h2>
          <p className="text-sm text-muted-foreground">
            Create engaging content for marketing and client communications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure your content generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="content-type">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {platform === "linkedin" && (
                      <>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                      </>
                    )}
                    {platform === "instagram" && (
                      <>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                      </>
                    )}
                    {platform === "email" && (
                      <>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="welcome">Welcome Email</SelectItem>
                      </>
                    )}
                    {platform === "whatsapp" && <SelectItem value="message">Message</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Theme</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Market volatility, Tax planning, SIPs"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Content Length</Label>
                <Select value={contentLength} onValueChange={setContentLength}>
                  <SelectTrigger id="length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-hashtags" className="cursor-pointer">
                    Include hashtags
                  </Label>
                  <Switch id="include-hashtags" checked={includeHashtags} onCheckedChange={setIncludeHashtags} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="include-emojis" className="cursor-pointer">
                    Include emojis
                  </Label>
                  <Switch id="include-emojis" checked={includeEmojis} onCheckedChange={setIncludeEmojis} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleGenerateContent} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Templates</CardTitle>
              <CardDescription>Quick-start with templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                    <span className="text-sm font-medium">Market Update</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    LinkedIn
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Professional update on market trends and investment opportunities
                </p>
              </div>

              <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-[#E1306C]" />
                    <span className="text-sm font-medium">Financial Tip Series</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Instagram
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Carousel of actionable financial tips for everyday investors
                </p>
              </div>

              <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#0496ff]" />
                    <span className="text-sm font-medium">Monthly Newsletter</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Email
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Comprehensive monthly update with market insights and recommendations
                </p>
              </div>

              <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#25D366]" />
                    <span className="text-sm font-medium">NFO Announcement</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    WhatsApp
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Brief message announcing a new fund offer to clients
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Content</CardTitle>
                  <CardDescription>Preview your AI-generated content</CardDescription>
                </div>
                {generatedContent && (
                  <div className="flex items-center gap-2">
                    <Badge className="flex items-center gap-1">
                      {getPlatformIcon()}
                      <span className="capitalize">{platform}</span>
                    </Badge>
                    <Button variant="outline" size="sm" onClick={handleCopyContent} className="h-8">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" /> Copy
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              {!generatedContent && !isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Content with AI</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Configure your content settings and click "Generate Content" to create engaging content for your
                    marketing and client communications.
                  </p>
                </div>
              ) : isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <RefreshCw className="h-12 w-12 text-[#0496ff] mb-4 animate-spin" />
                  <h3 className="text-lg font-medium mb-2">Generating Content</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Zinni AI is creating personalized content based on your settings...
                  </p>
                </div>
              ) : (
                <div className="whitespace-pre-line p-4 border rounded-lg bg-muted/20">{generatedContent}</div>
              )}
            </CardContent>
            <CardFooter className="border-t">
              {generatedContent && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Not quite right?</span>
                    <Button variant="outline" size="sm" onClick={handleGenerateContent} disabled={isGenerating}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button size="sm">
                      {getPlatformIcon()}
                      <span className="ml-2">Post to {platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
