import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// 检查环境变量
const hasUrl = !!process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== ""

// 如果有连接字符串，正常创建 sql / db -----------------------------
let sql: ReturnType<typeof neon>
let db: ReturnType<typeof drizzle>

if (hasUrl) {
  sql = neon(process.env.DATABASE_URL as string)
  db = drizzle(sql, { schema })
} else {
  // -----------------------------------------------------------------
  // 缺少 DATABASE_URL 时：创建“空实现”，避免整个应用崩溃
  // -----------------------------------------------------------------
  console.warn(
    "[LinkHub] Warning: DATABASE_URL is not set. " +
      "All database calls will return empty data. " +
      "Configure the environment variable to enable persistence.",
  )

  // 一个永远抛错的 sql tag，提醒开发者
  sql = (async () => {
    throw new Error("DATABASE_URL not configured")
  }) as unknown as typeof sql

  // 极简 Dummy db：query.* 返回空数组 / null
  const dummyHandler: ProxyHandler<object> = {
    get() {
      // 返回一个能链式调用但最终解析为空的函数 / Proxy
      return new Proxy(() => Promise.resolve([]), dummyHandler)
    },
  }
  db = new Proxy({} as any, dummyHandler)
}

// 导出
export { sql, db }
