import { AlertCards } from "@/components/alert-cards"
import { QuickActions } from "@/components/quick-actions"
import BusinessInsights from "@/components/business-insights"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FullDashboardPage() {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex items-center mb-4">
        <Link href="/dashboard">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Sparkles className="h-4 w-4" />
            Back to ZinniAI
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <QuickActions />
        <AlertCards />
        <BusinessInsights />
      </div>
    </div>
  )
}
