"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const urlSchema = z.string().url("Must be a valid URL").or(z.string().length(0))

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  description: z.string().optional(),
  favicon: urlSchema,
  categoryId: z.string().min(1, "Category is required"),
})

interface LinkFormProps {
  initialData?: {
    id: number
    title: string
    url: string
    description: string | null
    favicon: string | null
    categoryId: number
  } | null
  categories: {
    id: number
    name: string
  }[]
}

export function LinkForm({ initialData, categories }: LinkFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(initialData?.favicon || null)
  const [faviconError, setFaviconError] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      url: initialData?.url || "",
      description: initialData?.description || "",
      favicon: initialData?.favicon || "",
      categoryId: initialData?.categoryId ? String(initialData.categoryId) : "",
    },
  })

  // Function to check if a URL is valid
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  // Function to handle favicon URL changes
  const handleFaviconChange = (value: string) => {
    if (value && isValidUrl(value)) {
      setFaviconPreview(value)
      setFaviconError(false)
    } else if (value === "") {
      setFaviconPreview(null)
      setFaviconError(false)
    } else {
      setFaviconPreview(null)
      setFaviconError(true)
    }
  }

  // Function to try to get favicon from website URL
  const tryGetFavicon = async () => {
    const url = form.getValues("url")
    if (!url || !isValidUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL first.",
        variant: "destructive",
      })
      return
    }

    try {
      // Try common favicon locations
      const urlObj = new URL(url)
      const domain = urlObj.hostname
      const faviconUrl = `https://${domain}/favicon.ico`

      setFaviconPreview(faviconUrl)
      form.setValue("favicon", faviconUrl)
      setFaviconError(false)

      toast({
        title: "Favicon URL set",
        description: "The favicon URL has been set. Please check if it displays correctly.",
      })
    } catch (error) {
      console.error("Error getting favicon:", error)
      toast({
        title: "Error",
        description: "Failed to get favicon URL. Please enter it manually.",
        variant: "destructive",
      })
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const payload = {
        ...values,
        categoryId: Number.parseInt(values.categoryId),
        favicon: values.favicon || null,
      }

      if (initialData) {
        // Update existing link
        await fetch(`/api/links/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        toast({
          title: "Link updated",
          description: "Your link has been updated successfully.",
        })
      } else {
        // Create new link
        await fetch("/api/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        toast({
          title: "Link created",
          description: "Your link has been created successfully.",
        })
      }

      router.push("/admin/links")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to save link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Google" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. https://google.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="e.g. Search engine" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="favicon"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Favicon URL (optional)</FormLabel>
                  <Button type="button" variant="outline" size="sm" onClick={tryGetFavicon}>
                    Auto-detect
                  </Button>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. https://google.com/favicon.ico"
                    onChange={(e) => {
                      field.onChange(e)
                      handleFaviconChange(e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
                {faviconError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Invalid favicon URL. Please enter a valid URL or leave empty.</AlertDescription>
                  </Alert>
                )}
                {faviconPreview && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="border rounded p-2 bg-muted/20">
                      <img
                        src={faviconPreview || "/placeholder.svg"}
                        alt="Favicon preview"
                        className="w-6 h-6 object-contain"
                        onError={() => {
                          setFaviconError(true)
                          setFaviconPreview(null)
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">Favicon preview</span>
                  </div>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {initialData ? "Updating..." : "Creating..."}
              </>
            ) : initialData ? (
              "Update Link"
            ) : (
              "Create Link"
            )}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/links")}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
