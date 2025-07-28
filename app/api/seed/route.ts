import { NextResponse } from "next/server"
import { seed } from "@/lib/db/seed"

export async function GET(request: Request) {
  try {
    // Seed the database (this will also initialize tables if needed)
    const result = await seed()

    // Check if this is a browser request (has Accept header with text/html)
    const acceptHeader = request.headers.get("accept") || ""
    if (acceptHeader.includes("text/html")) {
      // Redirect to home page for browser requests
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Return JSON for API requests
    return NextResponse.json({ success: true, message: "Database initialized and seeded successfully" })
  } catch (error) {
    console.error("Error initializing database:", error)

    // Check if this is a browser request
    const acceptHeader = request.headers.get("accept") || ""
    if (acceptHeader.includes("text/html")) {
      // Redirect to error page for browser requests
      return NextResponse.redirect(new URL("/setup?error=true", request.url))
    }

    return NextResponse.json({ success: false, error: "Failed to initialize database" }, { status: 500 })
  }
}
