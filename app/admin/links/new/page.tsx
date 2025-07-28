import { db } from "@/lib/db"
import { LinkForm } from "@/components/admin/link-form"

export default async function NewLinkPage() {
  const allCategories = await db.query.categories.findMany({
    orderBy: (categories, { asc }) => [asc(categories.name)],
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Create Link</h1>

      <div className="bg-card rounded-md border shadow-sm p-6">
        <LinkForm categories={allCategories} />
      </div>
    </div>
  )
}
