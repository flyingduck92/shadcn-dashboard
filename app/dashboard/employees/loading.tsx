import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  const singleRowSkeleton = (
    <>
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </>
  )

  return <Card>
    <CardHeader>
      <CardTitle>
        Employees
      </CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-[60px_1fr_1fr_1fr_1fr] gap-4 items-center">
      {singleRowSkeleton}
      {singleRowSkeleton}
      {singleRowSkeleton}
    </CardContent>
  </Card>
}