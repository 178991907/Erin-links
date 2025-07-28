import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Database, Settings, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ConfigGuidePage() {
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Link Hub 配置指南</h1>
          <p className="text-muted-foreground">配置环境变量以启动你的应用</p>
        </div>

        <div className="space-y-6">
          {/* 必需环境变量 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                必需的环境变量
              </CardTitle>
              <CardDescription>这些环境变量是应用正常运行所必需的</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">DATABASE_URL</code>
                  <Badge variant="destructive">必需</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">PostgreSQL 数据库连接字符串，用于连接 Neon 数据库</p>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  postgresql://username:password@host/database?sslmode=require
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Neon 数据库设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                获取 Neon 数据库连接字符串
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <div>
                    <p className="font-medium">访问 Neon Console</p>
                    <p className="text-sm text-muted-foreground">
                      前往{" "}
                      <a
                        href="https://console.neon.tech/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        console.neon.tech
                      </a>{" "}
                      并登录你的账户
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <div>
                    <p className="font-medium">选择或创建项目</p>
                    <p className="text-sm text-muted-foreground">选择现有项目或创建新的数据库项目</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <div>
                    <p className="font-medium">复制连接字符串</p>
                    <p className="text-sm text-muted-foreground">
                      在项目 Dashboard 中找到 "Connection string" 并复制完整的 URL
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Vercel 配置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />在 Vercel 中配置环境变量
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <div>
                    <p className="font-medium">打开 Vercel Dashboard</p>
                    <p className="text-sm text-muted-foreground">
                      访问{" "}
                      <a
                        href="https://vercel.com/dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        vercel.com/dashboard
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <div>
                    <p className="font-medium">选择项目</p>
                    <p className="text-sm text-muted-foreground">找到并点击你的 Link Hub 项目</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <div>
                    <p className="font-medium">进入设置</p>
                    <p className="text-sm text-muted-foreground">点击 Settings 标签 → Environment Variables</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    4
                  </span>
                  <div>
                    <p className="font-medium">添加环境变量</p>
                    <div className="mt-2 space-y-2">
                      <div className="bg-muted p-3 rounded text-sm">
                        <div className="grid grid-cols-3 gap-2 font-medium mb-2">
                          <span>Name</span>
                          <span>Value</span>
                          <span>Environment</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <code>DATABASE_URL</code>
                          <code>postgresql://...</code>
                          <span>All (全选)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    5
                  </span>
                  <div>
                    <p className="font-medium">重新部署</p>
                    <p className="text-sm text-muted-foreground">保存后触发新的部署以应用环境变量</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* 验证配置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                验证配置
              </CardTitle>
              <CardDescription>配置完成后，使用这些工具验证设置</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
                  <a href="/api/health" target="_blank" rel="noopener noreferrer">
                    <div className="text-left">
                      <div className="font-medium">测试数据库连接</div>
                      <div className="text-sm text-muted-foreground">/api/health</div>
                    </div>
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
                  <a href="/api/seed" target="_blank" rel="noopener noreferrer">
                    <div className="text-left">
                      <div className="font-medium">初始化数据库</div>
                      <div className="text-sm text-muted-foreground">/api/seed</div>
                    </div>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 常见问题 */}
          <Card>
            <CardHeader>
              <CardTitle>常见问题</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Q: 为什么还是显示数据库错误？</h4>
                <p className="text-sm text-muted-foreground">
                  A: 确保环境变量已保存并重新部署了应用。环境变量更改需要重新部署才能生效。
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Q: 连接字符串格式是什么？</h4>
                <p className="text-sm text-muted-foreground">
                  A: 格式为 <code>postgresql://username:password@host/database?sslmode=require</code>
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Q: 需要设置其他环境变量吗？</h4>
                <p className="text-sm text-muted-foreground">
                  A: 目前只需要 DATABASE_URL。其他数据库相关变量由 Neon 自动提供。
                </p>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>提示：</strong> 配置完成后，访问{" "}
              <Link href="/" className="text-primary hover:underline">
                首页
              </Link>{" "}
              查看你的 Link Hub 是否正常运行。
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
