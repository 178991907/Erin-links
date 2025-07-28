import { CategoryForm } from "@/components/admin/category-form"

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Create Category</h1>

      <div className="bg-card rounded-md border shadow-sm p-6">
        <CategoryForm />
      </div>
    </div>
  )
}
