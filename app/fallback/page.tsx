import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Settings, AlertCircle } from "lucide-react"

export default function FallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <Database className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Link Hub Setup</CardTitle>
          <CardDescription>Your application needs to be configured</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Configuration Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  The application is running but needs database configuration to function properly.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Setup Steps:</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                  1
                </span>
                <div>
                  <strong>Set Environment Variables</strong>
                  <p className="text-muted-foreground">Add your DATABASE_URL in Vercel project settings</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                  2
                </span>
                <div>
                  <strong>Initialize Database</strong>
                  <p className="text-muted-foreground">Run the database setup to create tables</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                  3
                </span>
                <div>
                  <strong>Test Connection</strong>
                  <p className="text-muted-foreground">Verify everything is working correctly</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild>
              <a href="/api/seed" target="_blank" rel="noopener noreferrer">
                <Database className="h-4 w-4 mr-2" />
                Initialize Database
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/api/health" target="_blank" rel="noopener noreferrer">
                <Settings className="h-4 w-4 mr-2" />
                Test Connection
              </a>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            <p>Need help? Check the Vercel function logs for detailed error information.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
