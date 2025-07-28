import Link from "next/link"
import { db } from "@/lib/db"
import { categories, links } from "@/lib/db/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderClosed, Link2, Plus, ExternalLink } from "lucide-react"
import { count } from "drizzle-orm"

export default async function AdminDashboard() {
  let categoriesCount = [{ count: 0 }]
  let linksCount = [{ count: 0 }]

  try {
    categoriesCount = await db.select({ count: count() }).from(categories)
    linksCount = await db.select({ count: count() }).from(links)
  } catch (error) {
    console.error("Error fetching counts:", error)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FolderClosed className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-3xl font-bold">{categoriesCount[0]?.count || 0}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Manage your link categories.</p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/admin/categories">View Categories</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link2 className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-3xl font-bold">{linksCount[0]?.count || 0}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Manage your individual links.</p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/admin/links">View Links</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="secondary" className="w-full justify-start">
              <Link href="/admin/categories/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full justify-start">
              <Link href="/admin/links/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Link
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Welcome to Link Hub Admin!</h2>
          <p className="text-muted-foreground mb-4">
            Use the navigation panel to manage your categories and links. Your changes will be reflected on the
            public-facing website.
          </p>

          <h3 className="font-semibold mb-2">Get started by:</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              Adding a new{" "}
              <Link href="/admin/categories/new" className="text-primary hover:underline">
                category
              </Link>{" "}
              to group your links.
            </li>
            <li>
              Adding a new{" "}
              <Link href="/admin/links/new" className="text-primary hover:underline">
                link
              </Link>{" "}
              to an existing category.
            </li>
            <li>
              Exploring the public{" "}
              <Link href="/" className="text-primary hover:underline flex items-center">
                Link Hub page <ExternalLink className="h-3 w-3 ml-1" />
              </Link>{" "}
              to see your content.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
