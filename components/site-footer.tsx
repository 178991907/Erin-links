"use client"

import { useEffect, useState } from "react"

export function SiteFooter() {
  const [copyrightText, setCopyrightText] = useState("© 2025 All-Subject English Enlightenment. All rights reserved.")

  useEffect(() => {
    const loadCopyright = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const settings = await response.json()
          if (settings && settings.copyright) {
            setCopyrightText(settings.copyright)
          }
        }
      } catch (error) {
        console.error("Failed to load copyright settings:", error)
        // Keep default copyright text
      }
    }

    loadCopyright()
  }, [])

  return (
    <footer className="border-t py-4 sm:py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-2 sm:gap-4 md:h-16 md:flex-row">
        <p className="text-xs sm:text-sm text-muted-foreground text-center">{copyrightText}</p>
      </div>
    </footer>
  )
}
