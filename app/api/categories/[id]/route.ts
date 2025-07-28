import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { id } = params

    const updatedCategory = await db
      .update(categories)
      .set({
        name: body.name,
        slug: body.slug,
        icon: body.icon || null,
      })
      .where(eq(categories.id, Number.parseInt(id)))
      .returning()

    if (!updatedCategory.length) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(updatedCategory[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const deletedCategory = await db
      .delete(categories)
      .where(eq(categories.id, Number.parseInt(id)))
      .returning()

    if (!deletedCategory.length) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(deletedCategory[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
