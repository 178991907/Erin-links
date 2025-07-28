"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Link2, FolderClosed, Settings, LinkIcon, Lock } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin",
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: FolderClosed,
      current: pathname.startsWith("/admin/categories"),
    },
    {
      name: "Links",
      href: "/admin/links",
      icon: Link2,
      current: pathname.startsWith("/admin/links"),
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname.startsWith("/admin/settings"),
    },
    {
      name: "Change Password",
      href: "/admin/password",
      icon: Lock,
      current: pathname.startsWith("/admin/password"),
    },
  ]

  return (
    <div className="w-56 sm:w-64 bg-card border-r flex flex-col h-screen">
      <div className="p-3 sm:p-4 border-b">
        <Link href="/admin" className="flex items-center gap-2 text-primary">
          <LinkIcon className="h-4 sm:h-5 w-4 sm:w-5" />
          <span className="font-semibold text-sm sm:text-base">Link Hub Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm ${
              item.current ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-4 sm:h-5 w-4 sm:w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
