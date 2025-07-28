"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // If we're already on the login page, don't redirect
    if (pathname === "/admin/login") {
      setIsAuthenticated(false)
      return
    }

    // Check if user is authenticated using localStorage
    const isAuth = localStorage.getItem("is_authenticated") === "true"
    setIsAuthenticated(isAuth)

    // If not authenticated, redirect to login
    if (!isAuth) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If on login page, just render the children (login form)
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // Otherwise, render the admin layout with sidebar
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-3 sm:p-4 md:p-6 bg-muted/30 overflow-auto">{children}</main>
    </div>
  )
}
