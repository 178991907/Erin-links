import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { links } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { id } = params

    const updatedLink = await db
      .update(links)
      .set({
        title: body.title,
        url: body.url,
        description: body.description || null,
        favicon: body.favicon || null,
        categoryId: body.categoryId,
      })
      .where(eq(links.id, Number.parseInt(id)))
      .returning()

    if (!updatedLink.length) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    return NextResponse.json(updatedLink[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const deletedLink = await db
      .delete(links)
      .where(eq(links.id, Number.parseInt(id)))
      .returning()

    if (!deletedLink.length) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    return NextResponse.json(deletedLink[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
