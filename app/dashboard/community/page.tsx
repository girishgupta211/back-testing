import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Trophy, TrendingUp } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Community</h2>
        <p className="text-sm text-muted-foreground">Connect, learn, and grow with fellow distributors</p>
      </div>

      <Tabs defaultValue="discussions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Discussions
          </TabsTrigger>
          <TabsTrigger value="leaderboards" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" /> Leaderboards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6 pt-6">
          {/* Trending Topics Section - Sleeker design */}
          <Card className="border-[#0496ff]/20 bg-[#0496ff]/5">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-[#0496ff]" />
                Trending Topics
              </CardTitle>
              <CardDescription className="text-xs">Hot discussions in the community right now</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-medium text-sm truncate">SEBI's New MF Regulations</h3>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                        <span className="truncate">48 participants</span>
                        <span>•</span>
                        <span className="whitespace-nowrap">2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-800 shrink-0">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-medium text-sm truncate">AI Tools for Financial Advisors</h3>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                        <span className="truncate">36 participants</span>
                        <span>•</span>
                        <span className="whitespace-nowrap">5h ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 shrink-0">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-medium text-sm truncate">Market Volatility Strategies</h3>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                        <span className="truncate">42 participants</span>
                        <span>•</span>
                        <span className="whitespace-nowrap">1h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discussion Boards</CardTitle>
              <CardDescription>Engage with the community on various topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Best practices for client retention</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Share your strategies for maintaining long-term client relationships
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p>32 replies</p>
                      <p className="text-muted-foreground">Last post 2h ago</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">SEBI's new mutual fund regulations</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Discussion on the impact of recent regulatory changes
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p>48 replies</p>
                      <p className="text-muted-foreground">Last post 5h ago</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Digital marketing strategies for MF distributors</h3>
                      <p className="text-sm text-muted-foreground mt-1">Tips and tricks to grow your business online</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>27 replies</p>
                      <p className="text-muted-foreground">Last post 1d ago</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Tax planning strategies for HNI clients</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Advanced tax optimization techniques for high net worth individuals
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p>19 replies</p>
                      <p className="text-muted-foreground">Last post 2d ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboards" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Distributors leading in various metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="aum">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="aum">AUM</TabsTrigger>
                  <TabsTrigger value="clients">Clients</TabsTrigger>
                  <TabsTrigger value="growth">Growth</TabsTrigger>
                </TabsList>

                <TabsContent value="aum" className="pt-4">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Distributor</th>
                          <th className="py-3 px-4 text-right">AUM</th>
                          <th className="py-3 px-4 text-right">YoY Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">1</td>
                          <td className="py-3 px-4 font-medium">Rajiv Mehta</td>
                          <td className="py-3 px-4 text-right">₹85.2 Cr</td>
                          <td className="py-3 px-4 text-right text-green-600">+18.5%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">2</td>
                          <td className="py-3 px-4 font-medium">Priya Sharma</td>
                          <td className="py-3 px-4 text-right">₹72.8 Cr</td>
                          <td className="py-3 px-4 text-right text-green-600">+15.2%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4 font-medium">Amit Patel</td>
                          <td className="py-3 px-4 text-right">₹68.5 Cr</td>
                          <td className="py-3 px-4 text-right text-green-600">+22.7%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">4</td>
                          <td className="py-3 px-4 font-medium">Neha Gupta</td>
                          <td className="py-3 px-4 text-right">₹54.2 Cr</td>
                          <td className="py-3 px-4 text-right text-green-600">+12.8%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">5</td>
                          <td className="py-3 px-4 font-medium">Rahul Dravid</td>
                          <td className="py-3 px-4 text-right">₹48.7 Cr</td>
                          <td className="py-3 px-4 text-right text-green-600">+25.3%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="clients" className="pt-4">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Distributor</th>
                          <th className="py-3 px-4 text-right">Clients</th>
                          <th className="py-3 px-4 text-right">New This Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">1</td>
                          <td className="py-3 px-4 font-medium">Suresh Kumar</td>
                          <td className="py-3 px-4 text-right">325</td>
                          <td className="py-3 px-4 text-right text-green-600">+18</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">2</td>
                          <td className="py-3 px-4 font-medium">Ananya Desai</td>
                          <td className="py-3 px-4 text-right">287</td>
                          <td className="py-3 px-4 text-right text-green-600">+15</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4 font-medium">Vikram Mehta</td>
                          <td className="py-3 px-4 text-right">254</td>
                          <td className="py-3 px-4 text-right text-green-600">+12</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">4</td>
                          <td className="py-3 px-4 font-medium">Priya Sharma</td>
                          <td className="py-3 px-4 text-right">232</td>
                          <td className="py-3 px-4 text-right text-green-600">+8</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">5</td>
                          <td className="py-3 px-4 font-medium">Rahul Dravid</td>
                          <td className="py-3 px-4 text-right">185</td>
                          <td className="py-3 px-4 text-right text-green-600">+15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="growth" className="pt-4">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Distributor</th>
                          <th className="py-3 px-4 text-right">YoY Growth</th>
                          <th className="py-3 px-4 text-right">AUM</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">1</td>
                          <td className="py-3 px-4 font-medium">Rahul Dravid</td>
                          <td className="py-3 px-4 text-right text-green-600">+25.3%</td>
                          <td className="py-3 px-4 text-right">₹48.7 Cr</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">2</td>
                          <td className="py-3 px-4 font-medium">Amit Patel</td>
                          <td className="py-3 px-4 text-right text-green-600">+22.7%</td>
                          <td className="py-3 px-4 text-right">₹68.5 Cr</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4 font-medium">Rajiv Mehta</td>
                          <td className="py-3 px-4 text-right text-green-600">+18.5%</td>
                          <td className="py-3 px-4 text-right">₹85.2 Cr</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">4</td>
                          <td className="py-3 px-4 font-medium">Priya Sharma</td>
                          <td className="py-3 px-4 text-right text-green-600">+15.2%</td>
                          <td className="py-3 px-4 text-right">₹72.8 Cr</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">5</td>
                          <td className="py-3 px-4 font-medium">Neha Gupta</td>
                          <td className="py-3 px-4 text-right text-green-600">+12.8%</td>
                          <td className="py-3 px-4 text-right">₹54.2 Cr</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
