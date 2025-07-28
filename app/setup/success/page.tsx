import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, Settings } from "lucide-react"

export default function SetupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Setup Complete!</CardTitle>
          <CardDescription>Your Link Hub is ready to use</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The database has been successfully initialized with sample data. You can now start using Link Hub to manage
            your links.
          </p>

          <div className="rounded-md bg-muted p-4">
            <h3 className="text-sm font-medium mb-2">Next steps:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  1
                </span>
                <span>Visit the home page to see your link directory</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  2
                </span>
                <span>Go to the admin dashboard to manage your links and categories</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  3
                </span>
                <span>Customize your site settings to personalize your Link Hub</span>
              </li>
            </ul>
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
            <Link href="/admin">
              <Settings className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
