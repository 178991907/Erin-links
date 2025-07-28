import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LinkCardProps {
  link: {
    id: number
    title: string
    url: string
    description: string | null
    favicon: string | null
  }
}

export function LinkCard({ link }: LinkCardProps) {
  // Function to check if a URL is valid
  const isValidUrl = (url: string | null): boolean => {
    if (!url) return false
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  // Get favicon URL, ensuring it's a valid URL
  const faviconUrl = isValidUrl(link.favicon) ? link.favicon : null

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="mb-4 flex justify-center items-center">
          {faviconUrl ? (
            <div className="relative flex items-center justify-center min-h-[60px]">
              <img
                src={faviconUrl || "/placeholder.svg"}
                alt={`${link.title} favicon`}
                className="max-h-[60px] w-auto object-contain"
                style={{ maxWidth: "100%" }}
                onError={(e) => {
                  // If image fails to load, replace with default icon
                  e.currentTarget.style.display = "none"
                  const parent = e.currentTarget.parentElement
                  if (parent) {
                    const fallback = document.createElement("div")
                    fallback.className =
                      "w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center"
                    const icon = document.createElement("span")
                    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-muted-foreground"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`
                    fallback.appendChild(icon)
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              <ExternalLink className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="text-center w-full mb-4 flex-grow">
          <h3 className="text-lg font-medium mb-1 line-clamp-2">{link.title}</h3>
          {link.description && <p className="text-sm text-muted-foreground line-clamp-3 mt-1">{link.description}</p>}
        </div>

        <Button asChild variant="outline" size="sm" className="w-full mt-auto">
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            Visit Site
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
