import { db } from "./index"
import { settings } from "./schema"

export async function initializeDatabase() {
  try {
    console.log("Initializing database...")

    // Create tables if they don't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        icon TEXT DEFAULT 'folder',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        description TEXT,
        favicon TEXT,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        site_name VARCHAR(255) DEFAULT 'Link Hub',
        site_description TEXT DEFAULT 'A collection of useful links',
        logo TEXT,
        welcome_message TEXT DEFAULT 'Welcome to All-Subject English Enlightenment',
        welcome_message_chinese TEXT DEFAULT '欢迎来到全科英语启蒙',
        copyright TEXT DEFAULT '© 2025 All-Subject English Enlightenment. All rights reserved.',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Check and add missing columns
    try {
      await db.execute(`
        DO $$ 
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'settings' AND column_name = 'copyright'
            ) THEN
                ALTER TABLE settings ADD COLUMN copyright TEXT DEFAULT '© 2025 All-Subject English Enlightenment. All rights reserved.';
            END IF;
        END $$;
      `)
    } catch (error) {
      console.log("Column copyright may already exist or error adding it:", error)
    }

    // Insert default settings if none exist
    const existingSettings = await db.query.settings.findFirst()
    if (!existingSettings) {
      await db.insert(settings).values({
        siteName: "Link Hub",
        siteDescription: "A collection of useful links",
        welcomeMessage: "Welcome to All-Subject English Enlightenment",
        welcomeMessageChinese: "欢迎来到全科英语启蒙",
        copyright: "© 2025 All-Subject English Enlightenment. All rights reserved.",
      })
      console.log("Default settings inserted")
    }

    console.log("Database initialization completed successfully")
    return { success: true }
  } catch (error) {
    console.error("Database initialization failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
