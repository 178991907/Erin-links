import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowLeft, Calculator, Calendar, Clock, FileText, Search } from "lucide-react"

export default function ToolsPage() {
  const tools = [
    {
      title: "计算器",
      description: "简单的计算工具",
      icon: Calculator,
      url: "https://www.calculator.net/",
    },
    {
      title: "日历",
      description: "查看日期和安排",
      icon: Calendar,
      url: "https://calendar.google.com/",
    },
    {
      title: "时钟",
      description: "世界时间和计时器",
      icon: Clock,
      url: "https://time.is/",
    },
    {
      title: "笔记",
      description: "快速记录想法",
      icon: FileText,
      url: "https://keep.google.com/",
    },
    {
      title: "搜索",
      description: "网络搜索工具",
      icon: Search,
      url: "https://www.google.com/",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回首页
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">常用工具</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Card key={tool.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div className="mr-2 p-2 rounded-md bg-primary/10">
                    <tool.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    打开工具
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
