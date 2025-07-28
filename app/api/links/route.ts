import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { links } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newLink = await db
      .insert(links)
      .values({
        title: body.title,
        url: body.url,
        description: body.description || null,
        favicon: body.favicon || null,
        categoryId: body.categoryId,
      })
      .returning()

    return NextResponse.json(newLink[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
