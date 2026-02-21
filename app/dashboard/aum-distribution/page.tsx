import { AumMfdDistribution } from "@/components/aum-mfd-distribution"

export default function AumDistributionPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">AUM/MFD Distribution Analysis</h1>
      <AumMfdDistribution />
    </div>
  )
}
