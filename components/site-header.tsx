import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { initializeDatabase } from "@/lib/db/init-db"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { AnimatedWelcome } from "@/components/animated-welcome"

export async function SiteHeader() {
  let siteSettings: Awaited<ReturnType<typeof db.query.settings.findFirst>> | null = null

  try {
    // 确保数据库和字段就绪（若不存在自动初始化）
    await initializeDatabase()

    // 查询首条设置
    siteSettings = await db.query.settings.findFirst()
  } catch (error) {
    console.error("Error fetching site settings:", error)
    // 失败时保持 siteSettings 为 null，使用默认值渲染
  }

  return (
    <header className="bg-background py-4 sm:py-6 relative">
      {/* Theme toggle & Admin login */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/login" title="Admin Login">
            <LogIn className="h-4 sm:h-5 w-4 sm:w-5" />
            <span className="sr-only">Admin Login</span>
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 text-center">
        {/* Logo or fallback title */}
        <div className="flex justify-center mb-4 sm:mb-6">
          {siteSettings?.logo ? (
            <div className="relative flex justify-center">
              <Image
                src={siteSettings.logo || "/placeholder.svg"}
                alt={siteSettings.siteName ?? "Link Hub"}
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto max-h-[80px] sm:max-h-[120px] max-w-full object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-16 sm:h-20">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {siteSettings?.siteName ?? "Link Hub"}
              </span>
            </div>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">Hello</h1>

        <AnimatedWelcome
          englishText={siteSettings?.welcomeMessage ?? "Welcome to All-Subject English Enlightenment"}
          chineseText={siteSettings?.welcomeMessageChinese ?? "欢迎来到全科英语启蒙"}
        />
      </div>
    </header>
  )
}
