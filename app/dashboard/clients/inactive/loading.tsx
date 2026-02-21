import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-36" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-9 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <div className="rounded-md border">
            <div className="p-4 border-b">
              <div className="grid grid-cols-6 gap-4">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-5 w-full" />
                  ))}
              </div>
            </div>
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="p-4 border-b last:border-0">
                  <div className="grid grid-cols-6 gap-4">
                    {Array(6)
                      .fill(null)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-10 w-full" />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
