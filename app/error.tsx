"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Something went wrong!</CardTitle>
          <CardDescription>
            {error.digest && <span className="text-xs text-muted-foreground">Error ID: {error.digest}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            This is likely due to a database connection issue or missing environment variables.
          </p>

          <div className="rounded-md bg-muted p-4">
            <h3 className="text-sm font-medium mb-2">Possible solutions:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Check if DATABASE_URL is set in Vercel</li>
              <li>• Verify your Neon database is accessible</li>
              <li>• Try initializing the database</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try again
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/setup">
                <Home className="h-4 w-4 mr-2" />
                Go to Setup
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
