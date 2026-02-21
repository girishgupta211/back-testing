import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Bot, Clock, Cpu, Fingerprint, Layers, LineChart, Rocket, Shield, Sparkles } from "lucide-react"

export const metadata = {
  title: "Zinnimoney - AI-Powered Platform for Financial Advisors",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#0496ff] rounded-md flex items-center justify-center text-white font-bold">
              Z
            </div>
            <h1 className="text-2xl font-bold">Zinnimoney</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </header>

        <main>
          <section className="mb-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#0496ff] to-purple-500 text-transparent bg-clip-text">
                Grow your Business With Zinni
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Automate operations, retain clients, and grow your business with AI-powered insights and recommendations
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    <Sparkles className="h-5 w-5" />
                    Experience the Copilot
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Bot className="h-5 w-5" />
                    See AI Features
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-[#0496ff]" />
                  </div>
                  <CardTitle>Reduce Operational Load</CardTitle>
                  <CardDescription>Automate client onboarding, updates, and communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0496ff]"></div>
                      <span>AI-powered client onboarding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0496ff]"></div>
                      <span>Automated portfolio updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0496ff]"></div>
                      <span>Smart lead generation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2 text-[#0496ff]">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle>Retain Clients</CardTitle>
                  <CardDescription>Proactive strategies to maintain and grow relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                      <span>Portfolio rebalancing alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                      <span>Tax-loss harvesting opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                      <span>Personalized client communications</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2 text-purple-400">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle>Grow Your Business</CardTitle>
                  <CardDescription>Increase share of wallet and find new opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                      <span>Commission optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                      <span>Cross-selling opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                      <span>AI-powered investment insights</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2 text-green-400">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          <section className="mb-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
              <p className="text-gray-400">
                Zinnimoney leverages cutting-edge artificial intelligence to transform your financial advisory practice
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <Cpu className="h-8 w-8 text-[#0496ff] mb-2" />
                  <CardTitle className="text-lg">Predictive Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Anticipate market trends and client needs before they emerge</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <Fingerprint className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-lg">Personalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Tailor recommendations to each client's unique financial situation
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <Layers className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-lg">Deep Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Continuously improve recommendations based on outcomes and feedback
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <Rocket className="h-8 w-8 text-amber-400 mb-2" />
                  <CardTitle className="text-lg">Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Eliminate repetitive tasks and focus on high-value client interactions
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your practice?</h2>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Get Started with Zinnimoney
              </Button>
            </Link>
          </section>
        </main>

        <footer className="border-t border-gray-800 pt-8 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-[#0496ff] rounded-md flex items-center justify-center text-white font-bold">
                Z
              </div>
              <span className="font-bold">Zinnimoney</span>
            </div>
            <div className="text-sm text-gray-500">© 2025 Zinnimoney. All rights reserved. Powered by AI.</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
