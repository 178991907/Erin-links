import { Suspense } from "react"
import { SearchForm } from "@/components/search-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MainContent } from "@/components/main-content"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingSkeleton() {
  return (
    <div className="space-y-8 md:space-y-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="border rounded-lg p-4 space-y-4">
                <Skeleton className="h-12 w-12 mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-xl mx-auto mb-6 md:mb-8 px-2 sm:px-0">
          <SearchForm defaultValue={query} />
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <MainContent query={query} />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  )
}
