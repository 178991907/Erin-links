import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { settings } from "@/lib/db/schema"

export async function GET() {
  try {
    const siteSettings = await db.query.settings.findFirst()

    if (!siteSettings) {
      // Return default settings if none exist
      return NextResponse.json({
        id: null,
        siteName: "Link Hub",
        siteDescription: "A collection of useful links",
        logo: "",
        welcomeMessage: "Welcome to All-Subject English Enlightenment",
        welcomeMessageChinese: "欢迎来到全科英语启蒙",
        copyright: "© 2025 All-Subject English Enlightenment. All rights reserved.",
      })
    }

    return NextResponse.json(siteSettings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    // Return default settings on error
    return NextResponse.json({
      id: null,
      siteName: "Link Hub",
      siteDescription: "A collection of useful links",
      logo: "",
      welcomeMessage: "Welcome to All-Subject English Enlightenment",
      welcomeMessageChinese: "欢迎来到全科英语启蒙",
      copyright: "© 2025 All-Subject English Enlightenment. All rights reserved.",
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Creating settings with data:", body)

    const newSettings = await db
      .insert(settings)
      .values({
        siteName: body.siteName || "Link Hub",
        siteDescription: body.siteDescription || "A collection of useful links",
        logo: body.logo || null,
        welcomeMessage: body.welcomeMessage || "Welcome to All-Subject English Enlightenment",
        welcomeMessageChinese: body.welcomeMessageChinese || "欢迎来到全科英语启蒙",
        copyright: body.copyright || "© 2025 All-Subject English Enlightenment. All rights reserved.",
      })
      .returning()

    console.log("Settings created:", newSettings[0])
    return NextResponse.json(newSettings[0])
  } catch (error) {
    console.error("Error creating settings:", error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
