import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  icon: text("icon").default("folder"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  links: many(links),
}))

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  description: text("description"),
  favicon: text("favicon"),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const linksRelations = relations(links, ({ one }) => ({
  category: one(categories, {
    fields: [links.categoryId],
    references: [categories.id],
  }),
}))

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  siteName: varchar("site_name", { length: 255 }).default("Link Hub"),
  siteDescription: text("site_description").default("A collection of useful links"),
  logo: text("logo"),
  welcomeMessage: text("welcome_message").default("Welcome to All-Subject English Enlightenment"),
  welcomeMessageChinese: text("welcome_message_chinese").default("欢迎来到全科英语启蒙"),
  copyright: text("copyright").default("© 2025 All-Subject English Enlightenment. All rights reserved."),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})
