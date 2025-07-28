import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { CategoryForm } from "@/components/admin/category-form"

interface CategoryEditPageProps {
  params: {
    id: string
  }
}

export default async function CategoryEditPage({ params }: CategoryEditPageProps) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return notFound()
  }

  const category = await db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.id, id),
  })

  if (!category) {
    return notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Edit Category</h1>

      <div className="bg-card rounded-md border shadow-sm p-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}
