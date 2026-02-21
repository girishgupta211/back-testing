import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, TrendingDown, DollarSign } from "lucide-react"
import Link from "next/link"

export function AlertCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Alerts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/alerts/clients-at-risk">
          <Card className="hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients at Risk</CardTitle>
              <div className="rounded-full w-8 h-8 bg-red-950/50 flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Clients with significant portfolio value drop</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/alerts/portfolio-updates">
          <Card className="hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Updates</CardTitle>
              <div className="rounded-full w-8 h-8 bg-amber-950/50 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Clients who haven't received portfolio updates</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/alerts/rebalancing">
          <Card className="hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rebalancing Needed</CardTitle>
              <div className="rounded-full w-8 h-8 bg-primary/20 flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Clients whose portfolios need rebalancing</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/alerts/commission-mismatch">
          <Card className="hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Mismatch</CardTitle>
              <div className="rounded-full w-8 h-8 bg-purple-950/50 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">AMCs with commission payment discrepancies</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
