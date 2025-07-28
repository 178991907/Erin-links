import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Ensure icon is within length limits (255 chars max)
    const icon = body.icon && body.icon.length > 255 ? null : body.icon || null

    const newCategory = await db
      .insert(categories)
      .values({
        name: body.name,
        slug: body.slug,
        icon: icon,
      })
      .returning()

    return NextResponse.json(newCategory[0])
  } catch (error) {
    console.error("Error creating category:", error)

    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes("duplicate key") || error.message.includes("unique constraint")) {
        return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 })
      }
    }

    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
