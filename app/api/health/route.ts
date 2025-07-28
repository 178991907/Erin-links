import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          success: false,
          error: "DATABASE_URL environment variable is not set",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    // Test database connection
    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`SELECT NOW() as current_time, 'Connection successful' as status`

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: result[0],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
