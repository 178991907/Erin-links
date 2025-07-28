import { db } from "./index"
import { categories, links, settings } from "./schema"
import { initializeDatabase } from "./init-db"

export async function seed() {
  try {
    console.log("🌱 Starting database initialization and seeding...")

    // First, initialize the database tables
    const initResult = await initializeDatabase()
    if (!initResult.success) {
      throw new Error("Failed to initialize database tables")
    }

    // Check if we already have settings
    const existingSettings = await db.select().from(settings).limit(1)

    if (existingSettings.length === 0) {
      console.log("Creating default settings...")
      await db.insert(settings).values({
        siteName: "Link Hub",
        siteDescription: "A collection of useful links",
        welcomeMessage: "Welcome to All-Subject English Enlightenment",
        welcomeMessageChinese: "欢迎来到全科英语启蒙",
      })
    }

    // Check if we already have categories
    const existingCategories = await db.select().from(categories).limit(1)

    if (existingCategories.length === 0) {
      console.log("Creating default categories...")

      // Insert categories
      const [general, work, development, learning, txt] = await Promise.all([
        db
          .insert(categories)
          .values({
            name: "General",
            slug: "general",
            icon: "globe",
          })
          .returning(),
        db
          .insert(categories)
          .values({
            name: "Work",
            slug: "work",
            icon: "briefcase",
          })
          .returning(),
        db
          .insert(categories)
          .values({
            name: "Development",
            slug: "development",
            icon: "code",
          })
          .returning(),
        db
          .insert(categories)
          .values({
            name: "Learning",
            slug: "learning",
            icon: "book",
          })
          .returning(),
        db
          .insert(categories)
          .values({
            name: "txt",
            slug: "txt",
            icon: "file-text",
          })
          .returning(),
      ])

      // Insert links
      await Promise.all([
        // General links
        db
          .insert(links)
          .values({
            title: "Google",
            url: "https://google.com",
            description: "Search engine",
            favicon: "https://www.google.com/favicon.ico",
            categoryId: general[0].id,
          }),
        db.insert(links).values({
          title: "百度",
          url: "https://baidu.com",
          description: "Chinese search engine",
          favicon: "https://www.baidu.com/favicon.ico",
          categoryId: general[0].id,
        }),

        // Work links
        db
          .insert(links)
          .values({
            title: "GitHub",
            url: "https://github.com",
            description: "Code hosting platform",
            favicon: "https://github.com/favicon.ico",
            categoryId: work[0].id,
          }),

        // Development links
        db
          .insert(links)
          .values({
            title: "Next.js Docs",
            url: "https://nextjs.org/docs",
            description: "The React Framework for Production",
            favicon: "https://nextjs.org/favicon.ico",
            categoryId: development[0].id,
          }),
        db.insert(links).values({
          title: "Tailwind CSS",
          url: "https://tailwindcss.com",
          description: "A utility-first CSS framework",
          favicon: "https://tailwindcss.com/favicon.ico",
          categoryId: development[0].id,
        }),

        // Learning links
        db
          .insert(links)
          .values({
            title: "MDN Web Docs",
            url: "https://developer.mozilla.org",
            description: "Resources for developers, by developers",
            favicon: "https://developer.mozilla.org/favicon.ico",
            categoryId: learning[0].id,
          }),
      ])
    }

    console.log("✅ Database initialization and seeding complete!")
    return { success: true }
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}
