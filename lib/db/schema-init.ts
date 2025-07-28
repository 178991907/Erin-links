import { neon } from "@neondatabase/serverless"

export async function initializeSchema() {
  try {
    console.log("🏗️ Initializing database schema...")
    const sql = neon(process.env.DATABASE_URL!)

    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        icon VARCHAR(255) DEFAULT 'folder',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Create links table
    await sql`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        description TEXT,
        favicon TEXT,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Create settings table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        site_name VARCHAR(255) DEFAULT 'Link Hub',
        site_description TEXT DEFAULT 'A collection of useful links',
        logo TEXT,
        welcome_message TEXT DEFAULT 'Welcome to Link Hub',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    console.log("✅ Database schema initialized successfully!")
    return { success: true }
  } catch (error) {
    console.error("Error initializing database schema:", error)
    return { success: false, error }
  }
}
