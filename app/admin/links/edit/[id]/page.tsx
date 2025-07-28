import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { LinkForm } from "@/components/admin/link-form"

interface LinkEditPageProps {
  params: {
    id: string
  }
}

export default async function LinkEditPage({ params }: LinkEditPageProps) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return notFound()
  }

  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, id),
  })

  if (!link) {
    return notFound()
  }

  const categories = await db.query.categories.findMany({
    orderBy: (categories, { asc }) => [asc(categories.name)],
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Edit Link</h1>

      <div className="bg-card rounded-md border shadow-sm p-6">
        <LinkForm initialData={link} categories={categories} />
      </div>
    </div>
  )
}
