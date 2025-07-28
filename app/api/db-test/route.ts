import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Test the database connection
    const result = await sql`SELECT 1 as test`

    // Try to create a test table
    await sql`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert a test row
    await sql`INSERT INTO test_table (name) VALUES ('Test entry')`

    // Query the test table
    const testData = await sql`SELECT * FROM test_table LIMIT 5`

    return NextResponse.json({
      success: true,
      connectionTest: result,
      testData,
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: "Database connection test failed",
      },
      { status: 500 },
    )
  }
}
