"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { slugify } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  icon: z.string().optional(),
})

interface CategoryFormProps {
  initialData?: {
    id: number
    name: string
    slug: string
    icon: string | null
  } | null
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      icon: initialData?.icon || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = initialData
        ? await fetch(`/api/categories/${initialData.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
        : await fetch("/api/categories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save category")
      }

      router.push("/admin/categories")
      router.refresh()
    } catch (error) {
      console.error("Form submission error:", error)

      // Show user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes("already exists")) {
          form.setError("slug", {
            type: "manual",
            message: "A category with this slug already exists",
          })
        } else {
          // Set a general error that can be displayed
          form.setError("root", {
            type: "manual",
            message: error.message,
          })
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Development"
                  onChange={(e) => {
                    field.onChange(e)
                    // Auto-generate slug if field is empty or matches the previous auto-generated slug
                    if (!form.getValues("slug") || form.getValues("slug") === slugify(field.value)) {
                      form.setValue("slug", slugify(e.target.value))
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. development" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon (optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{form.formState.errors.root.message}</div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isLoading}>
            {initialData ? "Update Category" : "Create Category"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
