import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Database, Home } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SetupPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const hasError = searchParams.error === "true"

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Link Hub Setup</CardTitle>
          <CardDescription>Initialize your database to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem initializing the database. Please check your database connection settings and try
                again.
              </AlertDescription>
            </Alert>
          )}

          <p>
            Welcome to Link Hub! Before you can start using the application, you need to initialize the database. This
            will create all necessary tables and seed them with sample data.
          </p>

          <div className="rounded-md bg-muted p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">What this will do:</h3>
                <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                  <li>Create database tables (categories, links, settings)</li>
                  <li>Add sample categories and links</li>
                  <li>Configure default site settings</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/api/seed">Initialize Database</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
