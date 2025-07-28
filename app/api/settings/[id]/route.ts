import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { settings } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const id = Number.parseInt(params.id)

    console.log("Updating settings with ID:", id, "Data:", body)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const updatedSettings = await db
      .update(settings)
      .set({
        siteName: body.siteName || "Link Hub",
        siteDescription: body.siteDescription || "A collection of useful links",
        logo: body.logo || null,
        welcomeMessage: body.welcomeMessage || "Welcome to All-Subject English Enlightenment",
        welcomeMessageChinese: body.welcomeMessageChinese || "欢迎来到全科英语启蒙",
        copyright: body.copyright || "© 2025 All-Subject English Enlightenment. All rights reserved.",
        updatedAt: new Date(),
      })
      .where(eq(settings.id, id))
      .returning()

    if (!updatedSettings.length) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 })
    }

    console.log("Settings updated:", updatedSettings[0])
    return NextResponse.json(updatedSettings[0])
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    await db.delete(settings).where(eq(settings.id, id))

    return NextResponse.json({ message: "Settings deleted successfully" })
  } catch (error) {
    console.error("Error deleting settings:", error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
