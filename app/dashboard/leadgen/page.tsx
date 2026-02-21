import LeadGeneration from "@/components/lead-generation"
import { LeadTracking } from "@/components/lead-tracking"
import { ClientInsights } from "@/components/client-insights"

export default function LeadGenPage() {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-10">
      <LeadGeneration />
      <LeadTracking />
      <ClientInsights />
    </div>
  )
}
