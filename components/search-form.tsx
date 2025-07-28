"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchFormProps {
  defaultValue?: string
}

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set("q", term)
    } else {
      params.delete("q")
    }

    startTransition(() => {
      router.replace(`/?${params.toString()}`)
    })
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 sm:left-4 top-1/2 h-4 sm:h-5 w-4 sm:w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10 sm:pl-12 py-4 sm:py-6 text-base sm:text-lg w-full"
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
