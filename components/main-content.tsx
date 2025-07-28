import { db } from "@/lib/db"
import { LinkCard } from "@/components/link-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { initializeDatabase } from "@/lib/db/init-db"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Database } from "lucide-react"

interface MainContentProps {
  query: string
}

export async function MainContent({ query }: MainContentProps) {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      return <DatabaseError message="DATABASE_URL environment variable is not configured" />
    }

    // Try to initialize the database if tables don't exist
    const initResult = await initializeDatabase()

    if (!initResult.success) {
      console.error("Database initialization failed:", initResult.error)
      return <DatabaseError message={`Database initialization failed: ${initResult.error}`} />
    }

    // Fetch all categories with their links
    const categoriesWithLinks = await db.query.categories.findMany({
      with: {
        links: {
          orderBy: (links, { asc }) => [asc(links.title)],
        },
      },
      orderBy: (categories, { asc }) => [asc(categories.name)],
    })

    // Filter links if search query exists
    const filteredCategories = query
      ? categoriesWithLinks
          .map((category) => ({
            ...category,
            links: category.links.filter(
              (link) =>
                link.title.toLowerCase().includes(query.toLowerCase()) ||
                link.description?.toLowerCase().includes(query.toLowerCase()),
            ),
          }))
          .filter((category) => category.links.length > 0)
      : categoriesWithLinks

    if (filteredCategories.length > 0) {
      return (
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="flex items-center justify-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-primary text-center">{category.name}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6">
                {category.links.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="text-center py-12 max-w-2xl mx-auto">
        <p className="text-lg text-muted-foreground">
          {query ? "No links found matching your search" : "No links found. Add some links to get started!"}
        </p>
        <Button asChild className="mt-4">
          <Link href="/api/seed">Initialize with sample data</Link>
        </Button>
      </div>
    )
  } catch (error) {
    console.error("MainContent error:", error)
    return <DatabaseError message={error instanceof Error ? error.message : "Unknown database error"} />
  }
}

function DatabaseError({ message }: { message: string }) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 rounded-full p-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Database Configuration Required</h3>
            <p className="text-red-700 mb-4">{message}</p>

            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="font-medium text-red-900 mb-2">Quick Fix:</h4>
                <ol className="text-sm text-red-800 space-y-1">
                  <li>1. Go to your Vercel dashboard</li>
                  <li>2. Navigate to Project Settings → Environment Variables</li>
                  <li>3. Add your DATABASE_URL from Neon</li>
                  <li>4. Redeploy your application</li>
                </ol>
              </div>

              <div className="flex gap-2">
                <Button asChild size="sm">
                  <Link href="/fallback">Setup Guide</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="/api/health" target="_blank" rel="noopener noreferrer">
                    <Database className="h-4 w-4 mr-1" />
                    Test Connection
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
